import { onRequest } from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import admin from "firebase-admin";
import nodemailer from "nodemailer";
import corsLib from "cors";
import { FieldValue } from "firebase-admin/firestore";

// Initialize Firebase Admin
admin.initializeApp();
const cors = corsLib({ origin: true });

const ADMIN_EMAIL = "pasindugunathilaka96@gmail.com";
const ADMIN_PASSWORD = "nxre hvfp eaab alsi";
const HOTEL_NAME = "Vintage Villa";

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

// Get email credentials from environment variables
const getEmailTransporter = () => {
  try {
    // Get credentials from config variables
    const emailUser = ADMIN_EMAIL;
    const emailPassword = ADMIN_PASSWORD;

    console.log(
      "Email credentials check:",
      Boolean(emailUser) ? "Email user found" : "Email user MISSING",
      Boolean(emailPassword) ? "Password found" : "Password MISSING"
    );

    if (!emailUser || !emailPassword) {
      throw new Error(
        "Missing email credentials - make sure EMAIL_USER and EMAIL_PASSWORD are set"
      );
    }

    return nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: ADMIN_EMAIL,
        pass: ADMIN_PASSWORD,
      },
    });
  } catch (error) {
    console.error("Email transporter error:", error);
    logError("getEmailTransporter", error);
    throw error;
  }
};

// HTTP Function for Sending Booking Emails
export const sendBookingEmails = onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const functionName = "sendBookingEmails";

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

      // Extract booking data from the request with detailed error logging
      const { booking } = req.body.data || {};

      if (!booking) {
        const error = new Error("No booking data provided");
        await logError(functionName, error, { body: req.body });
        return res.status(400).json({
          data: { error: "No booking data provided", receivedBody: req.body },
        });
      }

      // Validate required fields
      const requiredFields = [
        "id",
        "customerName",
        "customerEmail",
        "customerPhone",
        "checkInDate",
        "checkOutDate",
        "roomTitle",
        "headCount",
        "mealOptions",
        "totalPrice",
        "discount",
      ];

      const missingFields = requiredFields.filter(
        (field) => booking[field] === undefined
      );
      if (missingFields.length > 0) {
        const error = new Error("Missing required fields");
        const context = {
          missingFields,
          receivedFields: Object.keys(booking),
          booking: JSON.stringify(booking),
        };

        await logError(functionName, error, context);
        return res.status(400).json({
          data: {
            error: "Missing required fields",
            missingFields,
            receivedFields: Object.keys(booking),
          },
        });
      }

      // Format dates with error handling
      let checkInDate, checkOutDate, nights;
      try {
        checkInDate = new Date(booking.checkInDate);
        checkOutDate = new Date(booking.checkOutDate);

        if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
          throw new Error("Invalid date format");
        }

        nights = Math.ceil(
          (checkOutDate.getTime() - checkInDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        if (nights <= 0) {
          const error = new Error("Check-out date must be after check-in date");
          const context = {
            checkIn: booking.checkInDate,
            checkOut: booking.checkOutDate,
            calculatedNights: nights,
          };

          await logError(functionName, error, context);
          return res.status(400).json({
            data: {
              error: "Check-out date must be after check-in date",
              checkIn: booking.checkInDate,
              checkOut: booking.checkOutDate,
            },
          });
        }

        checkInDate = checkInDate.toLocaleDateString();
        checkOutDate = checkOutDate.toLocaleDateString();
      } catch (err) {
        const context = {
          receivedDates: {
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate,
          },
        };

        await logError(functionName, err, context);
        return res.status(400).json({
          data: {
            error: "Invalid date format",
            message: err.message,
            receivedDates: {
              checkInDate: booking.checkInDate,
              checkOutDate: booking.checkOutDate,
            },
          },
        });
      }

      // Format meal options
      const meals = [];
      if (booking.mealOptions.breakfast) meals.push("Breakfast");
      if (booking.mealOptions.lunch) meals.push("Lunch");
      if (booking.mealOptions.dinner) meals.push("Dinner");
      const mealsText = meals.length > 0 ? meals.join(", ") : "None";

      // Email content for customer
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
          booking.totalPrice + booking.discount
        ).toFixed(2)}</p>
        <p><strong>Discount Applied:</strong> $${booking.discount.toFixed(
          2
        )}</p>
        <p><strong>Total:</strong> $${booking.totalPrice.toFixed(2)}</p>
        
        <p>For any questions, contact us.</p>
        <p>Best regards,<br>${HOTEL_NAME}</p>
      `;

      // Email content for admin
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
          booking.totalPrice + booking.discount
        ).toFixed(2)}</p>
        <p><strong>Discount:</strong> $${booking.discount.toFixed(2)}</p>
        <p><strong>Total:</strong> $${booking.totalPrice.toFixed(2)}</p>
      `;

      // Create email transporter with error handling
      let transporter;
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

      // Send emails with detailed error handling
      try {
        // Send customer email
        await transporter.sendMail({
          from: `"${HOTEL_NAME}" <${ADMIN_EMAIL}>`,
          to: booking.customerEmail,
          subject: "Booking Confirmation",
          html: customerEmailContent,
        });

        // Send admin email
        await transporter.sendMail({
          from: `"Booking System" <${ADMIN_EMAIL}>`,
          to: ADMIN_EMAIL,
          subject: `New Booking: ${booking.roomTitle} (${checkInDate} - ${checkOutDate})`,
          html: adminEmailContent,
        });
      } catch (err) {
        const context = {
          stage: "sending_emails",
          customerEmail: booking.customerEmail,
          adminEmail: ADMIN_EMAIL,
        };

        await logError(functionName, err, context);
        return res.status(500).json({
          data: {
            error: "Failed to send emails",
            message: err.message,
          },
        });
      }

      // Update booking status in Firestore with error handling
      try {
        await admin.firestore().collection("bookings").doc(booking.id).update({
          status: "confirmed",
          emailSent: true,
          emailSentAt: FieldValue.serverTimestamp(),
        });
      } catch (err) {
        const context = {
          stage: "updating_booking_status",
          bookingId: booking.id,
        };

        await logError(functionName, err, context);
        // Continue execution instead of returning error, as emails were sent successfully
        console.warn(
          `Failed to update booking status for ${booking.id}: ${err.message}`
        );
      }

      // Return success response with data property for httpsCallable
      return res.status(200).json({
        data: {
          success: true,
          message: "Emails sent successfully",
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

      // Return error response with data property for httpsCallable
      return res.status(500).json({
        data: {
          error: "Failed to process booking",
          message: error.message,
          code: error.code || "UNKNOWN_ERROR",
        },
      });
    }
  });
});

// Firestore Trigger for New Bookings
export const onNewBooking = onDocumentCreated(
  "bookings/{bookingId}",
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

      // Additional processing can be done here
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
export const sendStatusChangeEmail = onRequest(async (req, res) => {
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
      const checkInDate = new Date(booking.checkInDate).toLocaleDateString();
      const checkOutDate = new Date(booking.checkOutDate).toLocaleDateString();

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
          from: `"${HOTEL_NAME}" <${ADMIN_EMAIL}>`,
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
});