import { onRequest } from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { defineSecret, defineString, defineInt } from "firebase-functions/params";
import admin from "firebase-admin";
import nodemailer from "nodemailer";
import corsLib from "cors";
import { FieldValue } from "firebase-admin/firestore";

// Initialize Firebase Admin
admin.initializeApp();
const cors = corsLib({ origin: true });

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
const emailSmtpPortParam = defineInt("EMAIL_SMTP_PORT", { default: 465 });

const HOTEL_NAME = "Vintage Villa";

// Format a date consistently as dd/mm/yyyy for emails and WhatsApp
// messages, regardless of the server's locale (toLocaleDateString()
// without a fixed locale/options is unreliable across environments).
const formatDateDDMMYYYY = (dateInput) => {
  const date = new Date(dateInput);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
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
      Boolean(emailUser) ? "Email user found" : "Email user MISSING",
      Boolean(emailPassword) ? "Password found" : "Password MISSING",
      `SMTP: ${smtpHost}:${smtpPort}`
    );

    if (!emailUser || !emailPassword) {
      throw new Error(
        "Missing email credentials - make sure the ADMIN_EMAIL and ADMIN_PASSWORD secrets are set"
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
        "Missing Green API config - make sure the GREEN_API_ID_INSTANCE, GREEN_API_TOKEN_INSTANCE and WHATSAPP_NOTIFY_PHONE secrets are set"
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
      `Total: $${(booking.totalPrice || 0).toFixed(2)}` +
      `https://admin.vintagevilla.lk/booking-management`;

    const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId: `${notifyPhone}@c.us`,
        message,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        `Green API request failed with status ${response.status}: ${JSON.stringify(
          responseData
        )}`
      );
    }

    console.log("WhatsApp notification sent:", responseData);
    return true;
  } catch (error) {
    await logError(functionName, error, { bookingId: booking.id });
    console.error(`Failed to send WhatsApp notification: ${error.message}`);
    return false;
  }
};

// Send the booking-confirmation emails (to the customer and the admin)
// automatically in the background - used by the onNewBooking trigger.
const sendBookingConfirmationEmails = async (booking) => {
  const functionName = "sendBookingConfirmationEmails";
  try {
    const checkInDate = formatDateDDMMYYYY(booking.checkInDate);
    const checkOutDate = formatDateDDMMYYYY(booking.checkOutDate);
    const nights = Math.max(
      1,
      Math.ceil(
        (new Date(booking.checkOutDate).getTime() -
          new Date(booking.checkInDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );

    const meals = [];
    if (booking.mealOptions?.breakfast) meals.push("Breakfast");
    if (booking.mealOptions?.lunch) meals.push("Lunch");
    if (booking.mealOptions?.dinner) meals.push("Dinner");
    const mealsText = meals.length > 0 ? meals.join(", ") : "None";

    const customerEmailContent = `
      <h2>Booking Confirmation</h2>
      <p>Dear ${booking.customerName},</p>
      <p>Thank you for booking with us. Your reservation details:</p>

      <h3>Booking Details</h3>
      <p><strong>Booking Reference:</strong> ${booking.id}</p>
      <p><strong>Room:</strong> ${booking.roomTitle}</p>
      <p><strong>Check-in Date:</strong> ${checkInDate}</p>
      <p><strong>Check-out Date:</strong> ${checkOutDate}</p>
      <p><strong>Duration:</strong> ${nights} night(s)</p>
      <p><strong>Guests:</strong> ${booking.headCount}</p>
      <p><strong>Meals Included:</strong> ${mealsText}</p>

      <h3>Price Summary</h3>
      <p><strong>Subtotal:</strong> $${(
        (booking.totalPrice || 0) + (booking.discount || 0)
      ).toFixed(2)}</p>
      <p><strong>Discount Applied:</strong> $${(booking.discount || 0).toFixed(
        2
      )}</p>
      <p><strong>Total:</strong> $${(booking.totalPrice || 0).toFixed(2)}</p>

      <p>For any questions, contact us.</p>
      <p>Best regards,<br>${HOTEL_NAME}</p>
    `;

    const adminEmailContent = `
      <h2>New Booking Notification</h2>
      <p>A new booking has been made:</p>

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

    if (booking.customerEmail) {
      await transporter.sendMail({
        from: `"${HOTEL_NAME}" <${emailUser}>`,
        to: booking.customerEmail,
        subject: "Booking Confirmation",
        html: customerEmailContent,
      });
    }

    await transporter.sendMail({
      from: `"Booking System" <${emailUser}>`,
      to: emailUser,
      subject: `New Booking: ${booking.roomTitle} (${checkInDate} - ${checkOutDate})`,
      html: adminEmailContent,
    });

    console.log(`Booking confirmation emails sent for booking ${booking.id}`);
    return true;
  } catch (error) {
    await logError(functionName, error, { bookingId: booking.id });
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
        "Missing SESSION_ALERT_EMAILS secret - set it to a comma-separated list of alert recipient emails"
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

    const subject = isRestored
      ? `✅ WhatsApp notifications are back up - ${HOTEL_NAME}`
      : `⚠️ WhatsApp notifications are down - ${HOTEL_NAME}`;

    const html = isRestored
      ? `
        <h2>WhatsApp Session Restored</h2>
        <p>The WhatsApp connection used to send booking notifications is
        authorized again and back online.</p>
        <p>New booking notifications will resume going to WhatsApp as normal.</p>
      `
      : `
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
        ", "
      )} (state: ${stateInstance})`
    );
    return true;
  } catch (error) {
    await logError(functionName, error, { stateInstance });
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
        await logError(functionName, error, { eventId: event.id });
        console.log("No data associated with the event");
        return;
      }

      const booking = { id: event.params.bookingId, ...snapshot.data() };
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
  }
);

// HTTP Function for Sending Status Change Emails
export const sendStatusChangeEmail = onRequest(
  { secrets: [adminEmailSecret, adminPasswordSecret] },
  async (req, res) => {
  return cors(req, res, async () => {
    const functionName = "sendStatusChangeEmail";

    try {
      if (req.method !== "POST") {
        const error = new Error("Method not allowed");
        await logError(functionName, error, { method: req.method });
        return res.status(405).json({
          data: {
            error: "Method not allowed",
            message: "Only POST requests are accepted",
          },
        });
      }

      // Extract data from the request
      const { bookingId, newStatus, customMessage } = req.body.data || {};

      if (!bookingId || !newStatus) {
        const error = new Error("Missing required parameters");
        await logError(functionName, error, { body: req.body });
        return res.status(400).json({
          data: { 
            error: "Missing required parameters", 
            receivedData: req.body.data 
          },
        });
      }

      // Get booking data from Firestore
      const bookingDoc = await admin.firestore().collection("bookings").doc(bookingId).get();
      
      if (!bookingDoc.exists) {
        const error = new Error("Booking not found");
        await logError(functionName, error, { bookingId });
        return res.status(404).json({
          data: { 
            error: "Booking not found", 
            bookingId 
          },
        });
      }

      const booking = { id: bookingId, ...bookingDoc.data() };

      // Format dates
      const checkInDate = formatDateDDMMYYYY(booking.checkInDate);
      const checkOutDate = formatDateDDMMYYYY(booking.checkOutDate);

      // Status message mapping
      const statusMessages = {
        pending: "Your booking is currently pending confirmation.",
        confirmed: "Great news! Your booking has been confirmed.",
        cancelled: "Your booking has been cancelled. We're sorry for any inconvenience.",
        completed: "Your stay with us has been marked as completed. We hope you enjoyed your visit!"
      };

      // Create email content
      const statusEmailContent = `
        <h2>Booking Status Update</h2>
        <p>Dear ${booking.customerName},</p>
        <p><strong>Your booking status has been updated to: ${newStatus.toUpperCase()}</strong></p>
        <p>${statusMessages[newStatus] || ""}</p>
        ${customMessage ? `<p>${customMessage}</p>` : ""}
        
        <h3>Booking Details</h3>
        <p><strong>Booking Reference:</strong> ${booking.id}</p>
        <p><strong>Room:</strong> ${booking.roomTitle}</p>
        <p><strong>Check-in Date:</strong> ${checkInDate}</p>
        <p><strong>Check-out Date:</strong> ${checkOutDate}</p>
        
        <p>If you have any questions regarding this update, please don't hesitate to contact us.</p>
        <p>Best regards,<br>${HOTEL_NAME}</p>
      `;

      // Create email transporter with error handling
      let transporter;
      const emailUser = adminEmailSecret.value();
      try {
        transporter = getEmailTransporter();
      } catch (err) {
        await logError(functionName, err, { stage: "creating_transporter" });
        return res.status(500).json({
          data: {
            error: "Email configuration error",
            message: "Failed to configure email service",
          },
        });
      }

      // Send email with detailed error handling
      try {
        // Send status update email to customer
        await transporter.sendMail({
          from: `"${HOTEL_NAME}" <${emailUser}>`,
          to: booking.customerEmail,
          subject: `Booking Status Update: ${newStatus.toUpperCase()}`,
          html: statusEmailContent,
        });

        // Log the email in Firestore
        await admin.firestore().collection("bookings").doc(bookingId).collection("emails").add({
          type: "status_update",
          sentAt: FieldValue.serverTimestamp(),
          status: newStatus,
          message: customMessage || null,
          sentTo: booking.customerEmail
        });

      } catch (err) {
        const context = {
          stage: "sending_email",
          customerEmail: booking.customerEmail,
          bookingId: booking.id
        };

        await logError(functionName, err, context);
        return res.status(500).json({
          data: {
            error: "Failed to send email",
            message: err.message,
          },
        });
      }

      // Return success response
      return res.status(200).json({
        data: {
          success: true,
          message: "Status update email sent successfully",
          bookingId: booking.id,
        },
      });
    } catch (error) {
      // Catch-all error handler for unexpected errors
      const context = {
        path: req.path,
        body: JSON.stringify(req.body).substring(0, 500), // Limit size
        headers: req.headers,
        timestamp: new Date().toISOString(),
      };

      await logError(functionName, error, context);

      return res.status(500).json({
        data: {
          error: "Failed to process status update",
          message: error.message,
          code: error.code || "UNKNOWN_ERROR",
        },
      });
    }
  });
  }
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
  { secrets: [adminEmailSecret, adminPasswordSecret, sessionAlertEmailsSecret] },
  async (req, res) => {
    const functionName = "whatsappSessionWebhook";

    try {
      const { typeWebhook, stateInstance } = req.body || {};

      console.log("Green API webhook received:", typeWebhook, stateInstance);

      if (typeWebhook === "stateInstanceChanged" && stateInstance) {
        await sendSessionStateAlert(stateInstance);
      }

      // Always acknowledge receipt so Green API doesn't retry/spam this endpoint
      return res.status(200).json({ received: true });
    } catch (error) {
      await logError(functionName, error, { body: req.body });
      // Still return 200 - this is a webhook receiver, not a client-facing API
      return res.status(200).json({ received: true, error: error.message });
    }
  }
);