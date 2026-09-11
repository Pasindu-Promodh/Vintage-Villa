import {onRequest, onCall, HttpsError} from "firebase-functions/v2/https";
import {
  onDocumentCreated,
  onDocumentWritten,
} from "firebase-functions/v2/firestore";
import {defineSecret, defineString, defineInt} from "firebase-functions/params";
import admin from "firebase-admin";
import nodemailer from "nodemailer";
import {FieldValue} from "firebase-admin/firestore";

// Initialize Firebase Admin
admin.initializeApp();

// Shared secret that Green API must present (as ?token=... or an
// x-webhook-token header) when calling the session webhook, so the
// endpoint can't be triggered by arbitrary callers.
//   firebase functions:secrets:set WHATSAPP_WEBHOOK_TOKEN
const webhookTokenSecret = defineSecret("WHATSAPP_WEBHOOK_TOKEN");

// True when the given uid has an allow-list doc at admins/{uid}. Used to
// gate the callable admin endpoints. Firestore rules enforce the same
// check for direct client access.
const isAdminUid = async (uid) => {
  if (!uid) return false;
  try {
    const snap = await admin.firestore().collection("admins").doc(uid).get();
    return snap.exists;
  } catch (err) {
    console.error("isAdminUid lookup failed:", err);
    return false;
  }
};

// Secrets - set these once with:
//   firebase functions:secrets:set ADMIN_EMAIL
//   firebase functions:secrets:set ADMIN_PASSWORD
//   firebase functions:secrets:set GREEN_API_ID_INSTANCE
//   firebase functions:secrets:set GREEN_API_TOKEN_INSTANCE
//   firebase functions:secrets:set WHATSAPP_NOTIFY_PHONE
//   firebase functions:secrets:set SESSION_ALERT_EMAILS
// Never hardcode credentials directly in this file.
const adminEmailSecret = defineSecret("ADMIN_EMAIL");
const adminPasswordSecret = defineSecret("ADMIN_PASSWORD");
const greenApiIdInstanceSecret = defineSecret("GREEN_API_ID_INSTANCE");
const greenApiTokenInstanceSecret = defineSecret("GREEN_API_TOKEN_INSTANCE");
const whatsappNotifyPhoneSecret = defineSecret("WHATSAPP_NOTIFY_PHONE");
// Comma-separated list of email addresses to alert when the WhatsApp
// (Green API) session drops or is restored, e.g.
// "owner1@example.com,owner2@example.com"
const sessionAlertEmailsSecret = defineSecret("SESSION_ALERT_EMAILS");

// SMTP host/port for ADMIN_EMAIL - not sensitive, so these are plain
// params (not secrets). Default to Gmail; override in a .env / .env.<project-id>
// file in this functions folder if ADMIN_EMAIL isn't a Gmail/Google
// Workspace address, e.g. for Zoho Mail:
//   EMAIL_SMTP_HOST=smtp.zoho.com
//   EMAIL_SMTP_PORT=465
const emailSmtpHostParam = defineString("EMAIL_SMTP_HOST", {
  default: "smtp.gmail.com",
});
const emailSmtpPortParam = defineInt("EMAIL_SMTP_PORT", {default: 465});

const HOTEL_NAME = "Vintage Villa";

// Format a date consistently as dd/mm/yyyy for emails and WhatsApp
// messages, regardless of the server's locale (toLocaleDateString()
// without a fixed locale/options is unreliable across environments).
const formatDateDDMMYYYY = (dateInput) => {
  // Stored check-in/out values are calendar dates. Newer records are
  // plain "yyyy-MM-dd"; older ones are full ISO timestamps. In both
  // cases take just the date part so the day can't be shifted by the
  // server's timezone when it's read back.
  if (typeof dateInput === "string") {
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateInput.trim());
    if (match) {
      const [, year, month, day] = match;
      return `${day}/${month}/${year}`;
    }
  }
  const date = new Date(dateInput);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Per-status subject line, heading and opening paragraph for customer
// emails - keeps the wording honest about what's actually happened
// (a brand-new booking is "pending", not "confirmed").
const getStatusEmailCopy = (status, booking) => {
  const name = booking.customerName || "Guest";
  switch (status) {
    case "pending":
      return {
        subject: `Booking Received - ${booking.roomTitle}`,
        heading: "Thank You For Your Booking Request!",
        intro:
          `Thank you for choosing ${HOTEL_NAME}, ${name}! We've received ` +
          "your booking request and it is currently <strong>pending " +
          "confirmation</strong>. Our team will check availability and " +
          "get back to you shortly.",
      };
    case "confirmed":
      return {
        subject: `Booking Confirmed - ${booking.roomTitle}`,
        heading: "Your Booking Is Confirmed!",
        intro:
          `Great news, ${name} - your booking at ${HOTEL_NAME} has been ` +
          "<strong>confirmed</strong>. We look forward to welcoming you!",
      };
    case "cancelled":
      return {
        subject: `Booking Cancelled - ${booking.roomTitle}`,
        heading: "Your Booking Has Been Cancelled",
        intro:
          `Dear ${name}, your booking at ${HOTEL_NAME} has been ` +
          "<strong>cancelled</strong>. We're sorry for any inconvenience " +
          "this may cause - please don't hesitate to reach out if you " +
          "have questions or would like to make a new reservation.",
      };
    case "completed":
      return {
        subject: "Thank You For Staying With Us!",
        heading: "Thank You For Staying With Us!",
        intro:
          `Dear ${name}, thank you for staying at ${HOTEL_NAME}! We hope ` +
          "you had a wonderful time and that everything met your " +
          "expectations.",
      };
    default:
      return {
        subject: `Booking Update - ${booking.roomTitle}`,
        heading: "Booking Status Update",
        intro:
          `Dear ${name}, your booking status has been updated to ` +
          `<strong>${String(status).toUpperCase()}</strong>.`,
      };
  }
};

// Builds the subject + HTML body for a customer-facing status email.
// Shared by the "just booked" email (status "pending") and every later
// status-change email, so the wording and layout stay consistent and
// only need to be maintained in one place.
const buildStatusEmailContent = (status, booking, options = {}) => {
  const {customMessage, reviewUrl} = options;
  const checkInDate = formatDateDDMMYYYY(booking.checkInDate);
  const checkOutDate = formatDateDDMMYYYY(booking.checkOutDate);
  const {subject, heading, intro} = getStatusEmailCopy(status, booking);

  const meals = [];
  if (booking.mealOptions?.breakfast) meals.push("Breakfast");
  if (booking.mealOptions?.lunch) meals.push("Lunch");
  if (booking.mealOptions?.dinner) meals.push("Dinner");
  const mealsText = meals.length > 0 ? meals.join(", ") : "None";

  const reviewBlock =
    status === "completed" && reviewUrl ?
      `
        <h3>How Was Your Stay?</h3>
        <p>We'd love to hear about your experience. If you have a moment,
        please consider leaving us a review:</p>
        <p><a href="${reviewUrl}">${reviewUrl}</a></p>
      ` :
      "";

  const html = `
    <h2>${heading}</h2>
    <p>${intro}</p>
    ${customMessage ? `<p>${customMessage}</p>` : ""}

    <h3>Booking Details</h3>
    <p><strong>Booking Reference:</strong> ${booking.id}</p>
    <p><strong>Room:</strong> ${booking.roomTitle}</p>
    <p><strong>Check-in Date:</strong> ${checkInDate}</p>
    <p><strong>Check-out Date:</strong> ${checkOutDate}</p>
    <p><strong>Guests:</strong> ${booking.headCount}</p>
    <p><strong>Meals Included:</strong> ${mealsText}</p>

    <h3>Price Summary</h3>
    <p><strong>Subtotal:</strong> $${(
    (booking.totalPrice || 0) + (booking.discount || 0)
  ).toFixed(2)}</p>
    <p><strong>Discount Applied:</strong> $${(booking.discount || 0).toFixed(2)}</p>
    <p><strong>Total:</strong> $${(booking.totalPrice || 0).toFixed(2)}</p>
    ${reviewBlock}
    <p>If you have any questions, please don't hesitate to contact us.</p>
    <p>Best regards,<br>${HOTEL_NAME}</p>
  `;

  return {subject, html};
};

// Reads the guest-review link from settings/general (managed from the
// admin dashboard's Room Management page). Returns null if it's not set.
const getReviewUrl = async () => {
  try {
    const snap = await admin.firestore().collection("settings").doc("general").get();
    const reviewUrl = snap.exists ? snap.data().reviewUrl : null;
    return reviewUrl || null;
  } catch (err) {
    console.error("Failed to read review URL from settings/general:", err);
    return null;
  }
};

// Enhanced error logging utility
const logError = async (functionName, error, context = {}) => {
  try {
    const errorData = {
      function: functionName,
      timestamp: FieldValue.serverTimestamp(),
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace available",
      code: error.code || "NO_CODE",
      context: JSON.stringify(context),
      severity: "error",
    };

    console.error(`Error in ${functionName}:`, error);
    await admin.firestore().collection("errorLogs").add(errorData);
    return errorData;
  } catch (loggingError) {
    // If logging itself fails, at least console log both errors
    console.error("Error while logging error:", loggingError);
    console.error("Original error:", error);
    return null;
  }
};

// Get email credentials from Firebase secrets (set via `firebase functions:secrets:set`)
const getEmailTransporter = () => {
  try {
    const emailUser = adminEmailSecret.value();
    const emailPassword = adminPasswordSecret.value();
    const smtpHost = emailSmtpHostParam.value();
    const smtpPort = Number(emailSmtpPortParam.value());

    console.log(
        "Email credentials check:",
      emailUser ? "Email user found" : "Email user MISSING",
      emailPassword ? "Password found" : "Password MISSING",
      `SMTP: ${smtpHost}:${smtpPort}`,
    );

    if (!emailUser || !emailPassword) {
      throw new Error(
          "Missing email credentials - make sure the ADMIN_EMAIL and ADMIN_PASSWORD secrets are set",
      );
    }

    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465 (SSL), false for 587 (STARTTLS)
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });
  } catch (error) {
    console.error("Email transporter error:", error);
    logError("getEmailTransporter", error);
    throw error;
  }
};

// Send a WhatsApp notification to the villa owner via Green API
// (https://green-api.com)
const sendWhatsAppNotification = async (booking) => {
  const functionName = "sendWhatsAppNotification";
  try {
    const idInstance = greenApiIdInstanceSecret.value();
    const apiTokenInstance = greenApiTokenInstanceSecret.value();
    const notifyPhone = whatsappNotifyPhoneSecret.value();

    if (!idInstance || !apiTokenInstance || !notifyPhone) {
      throw new Error(
          "Missing Green API config - make sure the " +
          "GREEN_API_ID_INSTANCE, GREEN_API_TOKEN_INSTANCE and " +
          "WHATSAPP_NOTIFY_PHONE secrets are set",
      );
    }

    const checkIn = formatDateDDMMYYYY(booking.checkInDate);
    const checkOut = formatDateDDMMYYYY(booking.checkOutDate);

    const meals = [];
    if (booking.mealOptions?.breakfast) meals.push("Breakfast");
    if (booking.mealOptions?.lunch) meals.push("Lunch");
    if (booking.mealOptions?.dinner) meals.push("Dinner");
    const mealsText = meals.length > 0 ? meals.join(", ") : "None";

    const message =
      `*New Booking - ${HOTEL_NAME}*\n` +
      `Booking ID: ${booking.id}\n` +
      `Room: ${booking.roomTitle}\n` +
      `Check-in: ${checkIn}\n` +
      `Check-out: ${checkOut}\n` +
      `Guests: ${booking.headCount}\n` +
      `Meals: ${mealsText}\n` +
      `Customer: ${booking.customerName}\n` +
      `Phone: ${booking.customerPhone}\n` +
      `Email: ${booking.customerEmail || "Not provided"}\n` +
      `Discount: $${(booking.discount || 0).toFixed(2)}\n` +
      `Total: $${(booking.totalPrice || 0).toFixed(2)}\n` +
      `https://admin.vintagevilla.lk/booking-management`;

    const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        chatId: `${notifyPhone}@c.us`,
        message,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
          `Green API request failed with status ${response.status}: ${JSON.stringify(
              responseData,
          )}`,
      );
    }

    console.log("WhatsApp notification sent:", responseData);
    return true;
  } catch (error) {
    await logError(functionName, error, {bookingId: booking.id});
    console.error(`Failed to send WhatsApp notification: ${error.message}`);
    return false;
  }
};

// Send the "booking received" emails (to the customer and the admin)
// automatically in the background - used by the onNewBooking trigger. The
// customer email uses the shared "pending" template (a new booking is
// never auto-confirmed - an admin still has to confirm it), so this never
// tells the guest their stay is booked before it actually is.
const sendBookingConfirmationEmails = async (booking) => {
  const functionName = "sendBookingConfirmationEmails";
  try {
    const checkInDate = formatDateDDMMYYYY(booking.checkInDate);
    const checkOutDate = formatDateDDMMYYYY(booking.checkOutDate);

    // The public site stores "Not provided" (not an empty string) when the
    // guest skips the optional email field - treat that as no email.
    const customerEmail =
      booking.customerEmail && booking.customerEmail !== "Not provided" ?
        booking.customerEmail :
        null;

    const meals = [];
    if (booking.mealOptions?.breakfast) meals.push("Breakfast");
    if (booking.mealOptions?.lunch) meals.push("Lunch");
    if (booking.mealOptions?.dinner) meals.push("Dinner");
    const mealsText = meals.length > 0 ? meals.join(", ") : "None";

    const {subject: customerSubject, html: customerEmailContent} =
      buildStatusEmailContent("pending", booking);

    const adminEmailContent = `
      <h2>New Booking Notification</h2>
      <p>A new booking has been made and is <strong>pending
      confirmation</strong>:</p>

      <h3>Booking Details</h3>
      <p><strong>Booking Reference:</strong> ${booking.id}</p>
      <p><strong>Room:</strong> ${booking.roomTitle}</p>
      <p><strong>Check-in Date:</strong> ${checkInDate}</p>
      <p><strong>Check-out Date:</strong> ${checkOutDate}</p>
      <p><strong>Guests:</strong> ${booking.headCount}</p>
      <p><strong>Meals:</strong> ${mealsText}</p>

      <h3>Customer Info</h3>
      <p><strong>Name:</strong> ${booking.customerName}</p>
      <p><strong>Email:</strong> ${booking.customerEmail}</p>
      <p><strong>Phone:</strong> ${booking.customerPhone}</p>
      <p><strong>Preferred Contact:</strong> ${booking.preferredContactMethod || "whatsapp"}</p>

      <h3>Price Summary</h3>
      <p><strong>Subtotal:</strong> $${(
    (booking.totalPrice || 0) + (booking.discount || 0)
  ).toFixed(2)}</p>
      <p><strong>Discount:</strong> $${(booking.discount || 0).toFixed(2)}</p>
      <p><strong>Total:</strong> $${(booking.totalPrice || 0).toFixed(2)}</p>
      <p>https://admin.vintagevilla.lk/booking-management</p>
    `;

    const emailUser = adminEmailSecret.value();
    const transporter = getEmailTransporter();

    if (customerEmail) {
      await transporter.sendMail({
        from: `"${HOTEL_NAME}" <${emailUser}>`,
        to: customerEmail,
        subject: customerSubject,
        html: customerEmailContent,
      });
    }

    await transporter.sendMail({
      from: `"Booking System" <${emailUser}>`,
      to: emailUser,
      subject: `New Booking (Pending): ${booking.roomTitle} (${checkInDate} - ${checkOutDate})`,
      html: adminEmailContent,
    });

    console.log(`Booking confirmation emails sent for booking ${booking.id}`);
    return true;
  } catch (error) {
    await logError(functionName, error, {bookingId: booking.id});
    console.error(`Failed to send booking confirmation emails: ${error.message}`);
    return false;
  }
};

// Alert the villa owner by email whenever the WhatsApp (Green API)
// session's connection state changes - either dropping (logged out,
// blocked, etc.) or being restored back to authorized.
const sendSessionStateAlert = async (stateInstance) => {
  const functionName = "sendSessionStateAlert";
  const isRestored = stateInstance === "authorized";

  try {
    const recipientsRaw = sessionAlertEmailsSecret.value();
    if (!recipientsRaw) {
      throw new Error(
          "Missing SESSION_ALERT_EMAILS secret - set it to a comma-separated list of alert recipient emails",
      );
    }
    const recipients = recipientsRaw
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);

    if (recipients.length === 0) {
      throw new Error("SESSION_ALERT_EMAILS is set but contains no valid addresses");
    }

    const emailUser = adminEmailSecret.value();
    const transporter = getEmailTransporter();

    const subject = isRestored ?
      `✅ WhatsApp notifications are back up - ${HOTEL_NAME}` :
      `⚠️ WhatsApp notifications are down - ${HOTEL_NAME}`;

    const html = isRestored ?
      `
        <h2>WhatsApp Session Restored</h2>
        <p>The WhatsApp connection used to send booking notifications is
        authorized again and back online.</p>
        <p>New booking notifications will resume going to WhatsApp as normal.</p>
      ` :
      `
        <h2>WhatsApp Session Disconnected</h2>
        <p>The WhatsApp connection used to send booking notifications has
        dropped and is no longer authorized.</p>
        <p><strong>Reported state:</strong> ${stateInstance}</p>
        <p>New booking notifications will not reach WhatsApp until the
        session is reconnected. Log in to your Green API console and
        re-scan the QR code to restore the connection.</p>
        <p>Email notifications for new bookings are unaffected and will
        continue to be sent normally.</p>
      `;

    await transporter.sendMail({
      from: `"${HOTEL_NAME} Booking System" <${emailUser}>`,
      to: recipients.join(", "),
      subject,
      html,
    });

    console.log(
        `Session ${isRestored ? "restored" : "drop"} alert emailed to: ${recipients.join(
            ", ",
        )} (state: ${stateInstance})`,
    );
    return true;
  } catch (error) {
    await logError(functionName, error, {stateInstance});
    console.error(`Failed to send session ${isRestored ? "restored" : "drop"} alert: ${error.message}`);
    return false;
  }
};

// Firestore Trigger for New Bookings
export const onNewBooking = onDocumentCreated(
    {
      document: "bookings/{bookingId}",
      secrets: [
        greenApiIdInstanceSecret,
        greenApiTokenInstanceSecret,
        whatsappNotifyPhoneSecret,
        adminEmailSecret,
        adminPasswordSecret,
      ],
    },
    async (event) => {
      const functionName = "onNewBooking";

      try {
        const snapshot = event.data;
        if (!snapshot) {
          const error = new Error("No data associated with the event");
          await logError(functionName, error, {eventId: event.id});
          console.log("No data associated with the event");
          return;
        }

        const booking = {id: event.params.bookingId, ...snapshot.data()};
        console.log(`New booking created with ID: ${booking.id}`);

        // Automatically notify the villa owner on WhatsApp and send
        // confirmation emails - no manual step needed. Run both even if
        // one fails, so a WhatsApp outage doesn't block email and vice versa.
        await Promise.allSettled([
          sendWhatsAppNotification(booking),
          sendBookingConfirmationEmails(booking),
        ]);
      } catch (error) {
        const context = {
          eventId: event.id,
          bookingId: event.params?.bookingId,
          path: event.fullPath,
        };

        await logError(functionName, error, context);
        console.error(`Error processing new booking: ${error.message}`);
      }
    },
);

// Keep the public "booked_ranges" mirror in sync with confirmed bookings.
// This collection carries no customer PII (just room + date range), so the
// public booking calendar can read it while the "bookings" collection
// itself stays locked down to admins by the Firestore rules.
export const syncBookedRange = onDocumentWritten(
    "bookings/{bookingId}",
    async (event) => {
      const functionName = "syncBookedRange";
      const bookingId = event.params.bookingId;
      try {
        const after = event.data?.after?.exists ? event.data.after.data() : null;
        const ref = admin.firestore().collection("booked_ranges").doc(bookingId);

        const blocksCalendar =
        after &&
        after.status === "confirmed" &&
        after.checkInDate &&
        after.checkOutDate;

        if (blocksCalendar) {
          await ref.set({
            roomId: after.roomId || null,
            roomTitle: after.roomTitle || null,
            startDate: String(after.checkInDate).split("T")[0],
            endDate: String(after.checkOutDate).split("T")[0],
            updatedAt: FieldValue.serverTimestamp(),
          });
        } else {
          await ref.delete().catch(() => {});
        }
      } catch (error) {
        await logError(functionName, error, {bookingId});
      }
    },
);

// One-time (re-runnable) backfill so existing confirmed bookings show up in
// the public "booked_ranges" mirror. Admin-only callable.
export const backfillBookedRanges = onCall(async (request) => {
  if (!request.auth || !(await isAdminUid(request.auth.uid))) {
    throw new HttpsError("permission-denied", "Admin access required.");
  }

  const db = admin.firestore();
  const snap = await db
      .collection("bookings")
      .where("status", "==", "confirmed")
      .get();

  let batch = db.batch();
  let pending = 0;
  let synced = 0;

  for (const docSnap of snap.docs) {
    const booking = docSnap.data();
    if (!booking.checkInDate || !booking.checkOutDate) continue;

    batch.set(db.collection("booked_ranges").doc(docSnap.id), {
      roomId: booking.roomId || null,
      roomTitle: booking.roomTitle || null,
      startDate: String(booking.checkInDate).split("T")[0],
      endDate: String(booking.checkOutDate).split("T")[0],
      updatedAt: FieldValue.serverTimestamp(),
    });
    synced += 1;
    pending += 1;

    if (pending === 400) {
      await batch.commit();
      batch = db.batch();
      pending = 0;
    }
  }

  if (pending > 0) await batch.commit();
  return {synced};
});

// Callable used by the admin dashboard to email a customer when their
// booking status changes. Requires an authenticated admin (allow-listed
// at admins/{uid}); the previous open HTTP endpoint let anyone trigger
// customer emails.
export const sendStatusChangeEmail = onCall(
    {secrets: [adminEmailSecret, adminPasswordSecret]},
    async (request) => {
      const functionName = "sendStatusChangeEmail";

      if (!request.auth) {
        throw new HttpsError("unauthenticated", "You must be signed in.");
      }
      if (!(await isAdminUid(request.auth.uid))) {
        throw new HttpsError("permission-denied", "Admin access required.");
      }

      const {bookingId, newStatus, customMessage} = request.data || {};
      if (!bookingId || !newStatus) {
        throw new HttpsError(
            "invalid-argument",
            "bookingId and newStatus are required.",
        );
      }

      try {
        const bookingDoc = await admin
            .firestore()
            .collection("bookings")
            .doc(bookingId)
            .get();

        if (!bookingDoc.exists) {
          throw new HttpsError("not-found", `Booking ${bookingId} not found.`);
        }

        const booking = {id: bookingId, ...bookingDoc.data()};

        const recipient =
        booking.customerEmail && booking.customerEmail !== "Not provided" ?
          booking.customerEmail :
          null;
        if (!recipient) {
          throw new HttpsError(
              "failed-precondition",
              "This booking has no customer email on file.",
          );
        }

        // The review link only matters for a "completed" email - skip the
        // extra Firestore read otherwise.
        const reviewUrl =
          newStatus === "completed" ? await getReviewUrl() : null;

        const {subject, html: statusEmailContent} = buildStatusEmailContent(
            newStatus,
            booking,
            {customMessage, reviewUrl},
        );

        const emailUser = adminEmailSecret.value();
        const transporter = getEmailTransporter();

        await transporter.sendMail({
          from: `"${HOTEL_NAME}" <${emailUser}>`,
          to: recipient,
          subject,
          html: statusEmailContent,
        });

        await admin
            .firestore()
            .collection("bookings")
            .doc(bookingId)
            .collection("emails")
            .add({
              type: "status_update",
              sentAt: FieldValue.serverTimestamp(),
              status: newStatus,
              message: customMessage || null,
              sentTo: recipient,
            });

        return {
          success: true,
          message: "Status update email sent successfully",
          bookingId,
        };
      } catch (error) {
        if (error instanceof HttpsError) throw error;
        await logError(functionName, error, {bookingId});
        throw new HttpsError("internal", error.message || "Failed to send email.");
      }
    },
);

// HTTP endpoint for Green API to call whenever the WhatsApp session's
// connection state changes (configure this URL as the "Webhook URL" in
// your Green API instance settings, with "Incoming webhook" /
// "stateInstanceChanged" notifications enabled). Emails everyone in
// SESSION_ALERT_EMAILS both when the session drops AND when it's
// restored back to authorized - Green API only fires this webhook type
// on an actual state change, so there's no risk of spamming an email on
// every routine check.
export const whatsappSessionWebhook = onRequest(
    {
      secrets: [
        adminEmailSecret,
        adminPasswordSecret,
        sessionAlertEmailsSecret,
        webhookTokenSecret,
      ],
    },
    async (req, res) => {
      const functionName = "whatsappSessionWebhook";

      // Reject callers that don't present the shared secret. Configure the
      // Green API webhook URL with ?token=<WHATSAPP_WEBHOOK_TOKEN>.
      const expectedToken = webhookTokenSecret.value();
      const providedToken =
      req.query.token || req.get("x-webhook-token") || "";
      if (!expectedToken || providedToken !== expectedToken) {
        return res.status(403).json({received: false, error: "Forbidden"});
      }

      try {
        const {typeWebhook, stateInstance} = req.body || {};

        console.log("Green API webhook received:", typeWebhook, stateInstance);

        if (typeWebhook === "stateInstanceChanged" && stateInstance) {
          await sendSessionStateAlert(stateInstance);
        }

        // Always acknowledge receipt so Green API doesn't retry/spam this endpoint
        return res.status(200).json({received: true});
      } catch (error) {
        await logError(functionName, error, {body: req.body});
        // Still return 200 - this is a webhook receiver, not a client-facing API
        return res.status(200).json({received: true, error: error.message});
      }
    },
);
