// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Typography,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Button,
//   Snackbar,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "./firebaseConfig"; // Import the Firebase config from your existing file
// import { httpsCallable } from "firebase/functions";
// import { functions } from "./firebaseConfig"; // Import functions from your Firebase config

// interface BookingModalProps {
//   open: boolean;
//   handleClose: () => void;
//   selectedRoom: {
//     id: string;
//     title: string;
//     price: number;
//     price_extra: number;
//     capacity: number;
//   };
//   pricing:{
//     lunchPrice: number;
//     dinnerPrice: number;
//     discountRate: number;
//   }
// }

// const BookingModal: React.FC<BookingModalProps> = ({
//   open,
//   handleClose,
//   selectedRoom,
//   pricing
// }) => {
//   const [headCount, setHeadCount] = useState(1);
//   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
//     null,
//     null,
//   ]);
//   const [mealOptions, setMealOptions] = useState({
//     breakfast: false,
//     lunch: false,
//     dinner: false,
//   });
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState(""); // Added phone field
//   const [loading, setLoading] = useState(false);
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "success" as "success" | "error",
//   });

//   // Example unavailable date ranges
//   const unavailableDateRanges = [
//     { start: new Date(2024, 10, 25), end: new Date(2024, 10, 27) }, // Nov 25–27, 2024
//     { start: new Date(2024, 11, 10), end: new Date(2024, 11, 12) }, // Dec 10–12, 2024
//   ];

//   // Check if a date falls within any unavailable range
//   const isDateUnavailable = (date: Date) => {
//     return unavailableDateRanges.some(
//       (range) => date >= range.start && date <= range.end
//     );
//   };

//   const handleHeadCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Number(e.target.value);
//     if (value > selectedRoom.capacity) {
//       alert(`Maximum ${selectedRoom.capacity} people allowed per room.`);
//     } else {
//       setHeadCount(value);
//     }
//   };

//   const calculateDiscount = () => {
//     const [checkInDate, checkOutDate] = dateRange;
//     if (!checkInDate || !checkOutDate) return 0;

//     const days = Math.ceil(
//       (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
//         (1000 * 60 * 60 * 24)
//     );

//     if (days <= 1) return 0;

//     // Calculate total room cost per day (base + additional persons)
//     const dailyRoomCost =
//       selectedRoom.price + selectedRoom.price_extra * (headCount - 1);

//     // Apply 25% discount for each additional day
//     return dailyRoomCost * (pricing.discountRate/100) * (days - 1);
//   };

//   const calculatePrice = () => {
//     const [checkInDate, checkOutDate] = dateRange;
//     if (!checkInDate || !checkOutDate) return 0;

//     const days = Math.ceil(
//       (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
//         (1000 * 60 * 60 * 24)
//     );

//     // Calculate total room cost per day (base + additional persons)
//     const dailyRoomCost =
//       selectedRoom.price + selectedRoom.price_extra * (headCount - 1);

//     // Total room cost for the stay, minus discount
//     const roomCost = dailyRoomCost * days - calculateDiscount();

//     // Meal cost
//     const mealsCost =
//       headCount *
//       days *
//       (+mealOptions.breakfast * 0 +
//         +mealOptions.lunch * pricing.lunchPrice +
//         +mealOptions.dinner * pricing.dinnerPrice);

//     return roomCost + mealsCost;
//   };

//   const handleConfirmBooking = async () => {
//     const [checkInDate, checkOutDate] = dateRange;
//     if (!checkInDate || !checkOutDate || !email || !name) {
//       setNotification({
//         open: true,
//         message: "Please fill in all required fields",
//         severity: "error",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       // Create booking object for Firestore
//       const bookingData = {
//         roomId: selectedRoom.id,
//         roomTitle: selectedRoom.title,
//         checkInDate: checkInDate.toISOString(),
//         checkOutDate: checkOutDate.toISOString(),
//         headCount,
//         customerName: name,
//         customerEmail: email,
//         customerPhone: phone || "Not provided", // Use empty string if not provided
//         mealOptions: {
//           breakfast: mealOptions.breakfast,
//           lunch: mealOptions.lunch,
//           dinner: mealOptions.dinner,
//         },
//         discount: calculateDiscount(),
//         totalPrice: calculatePrice(),
//         createdAt: serverTimestamp(),
//         status: "pending",
//       };

//       // Save booking to Firestore
//       const bookingRef = await addDoc(collection(db, "bookings"), bookingData);
//       const bookingId = bookingRef.id;

//       // Call Cloud Function to send emails
//       // const sendBookingEmails = httpsCallable(functions, "sendBookingEmails");
//       // await sendBookingEmails({
//       //   booking: {
//       //     id: bookingId,
//       //     customerName: name,
//       //     customerEmail: email,
//       //     customerPhone: phone || "Not provided",
//       //     roomTitle: selectedRoom.title,
//       //     checkInDate: checkInDate.toISOString(),
//       //     checkOutDate: checkOutDate.toISOString(),
//       //     headCount,
//       //     mealOptions: {
//       //       breakfast: mealOptions.breakfast,
//       //       lunch: mealOptions.lunch,
//       //       dinner: mealOptions.dinner,
//       //     },
//       //     discount: calculateDiscount(),
//       //     totalPrice: calculatePrice(),
//       //   }
//       // });

//       // Also send via WhatsApp as before
//       const message = `
//         *Booking Confirmation*:
//         Booking ID: ${bookingId}
//         Room: ${selectedRoom?.title}
//         Check-in: ${checkInDate.toLocaleDateString()}
//         Check-out: ${checkOutDate.toLocaleDateString()}
//         Head Count: ${headCount}
//         Customer: ${name} (${email})
//         Phone: ${phone || "Not provided"}
//         Meals: 
//           - Breakfast: ${mealOptions.breakfast ? "Yes" : "No"}
//           - Lunch: ${mealOptions.lunch ? "Yes" : "No"}
//           - Dinner: ${mealOptions.dinner ? "Yes" : "No"}
//         Discount: $${calculateDiscount().toFixed(2)}
//         Total Price: $${calculatePrice().toFixed(2)}
//       `;

//       const whatsappURL = `https://wa.me/+94774010635?text=${encodeURIComponent(
//         message
//       )}`;

//       // Open WhatsApp in new tab
//       window.open(whatsappURL, "_blank");

//       // Show success notification
//       setNotification({
//         open: true,
//         message: "Booking confirmed! Check your email for details.",
//         severity: "success",
//       });

//       // Close modal after success
//       setTimeout(() => {
//         handleClose();
//         resetForm();
//       }, 2000);
//     } catch (error) {
//       console.error("Error saving booking:", error);
//       setNotification({
//         open: true,
//         message: "Error saving booking. Please try again.",
//         severity: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setHeadCount(1);
//     setDateRange([null, null]);
//     setMealOptions({
//       breakfast: false,
//       lunch: false,
//       dinner: false,
//     });
//     setEmail("");
//     setName("");
//     setPhone("");
//   };

//   const handleCloseNotification = () => {
//     setNotification((prev) => ({ ...prev, open: false }));
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//         <DialogTitle>Book {selectedRoom?.title || "Room"}</DialogTitle>
//         <DialogContent>
//           {/* Customer Information */}
//           <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
//             Your Information:
//           </Typography>
//           <TextField
//             label="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             fullWidth
//             margin="dense"
//             required
//           />
//           <TextField
//             label="Email Address"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//             margin="dense"
//             required
//             helperText="We'll send your booking confirmation to this email"
//           />
//           <TextField
//             label="Phone Number"
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             fullWidth
//             margin="dense"
//             helperText="Optional, but recommended for contact purposes"
//           />

//           <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
//             Select your booking dates:
//           </Typography>

//           {/* Date Range Picker */}
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DateRangePicker
//               value={dateRange}
//               onChange={(newValue) => setDateRange(newValue)}
//               disablePast
//               shouldDisableDate={isDateUnavailable}
//               renderInput={(startProps, endProps) => (
//                 <>
//                   <TextField
//                     {...startProps}
//                     fullWidth
//                     margin="dense"
//                     label="Check-in Date"
//                   />
//                   <TextField
//                     {...endProps}
//                     fullWidth
//                     margin="dense"
//                     label="Check-out Date"
//                   />
//                 </>
//               )}
//             />
//           </LocalizationProvider>

//           {/* Head Count */}
//           <TextField
//             label="Head Count"
//             type="number"
//             InputProps={{ inputProps: { min: 1, max: 4 } }}
//             value={headCount}
//             onChange={handleHeadCountChange}
//             fullWidth
//             margin="dense"
//           />

//           {/* Meal Options */}
//           <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
//             Meal Options:
//           </Typography>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={mealOptions.breakfast}
//                 onChange={() =>
//                   setMealOptions((prev) => ({
//                     ...prev,
//                     breakfast: !prev.breakfast,
//                   }))
//                 }
//               />
//             }
//             label="Breakfast (Free)"
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={mealOptions.lunch}
//                 onChange={() =>
//                   setMealOptions((prev) => ({ ...prev, lunch: !prev.lunch }))
//                 }
//               />
//             }
//             label={`Lunch ($${pricing.lunchPrice} per person)`}
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={mealOptions.dinner}
//                 onChange={() =>
//                   setMealOptions((prev) => ({ ...prev, dinner: !prev.dinner }))
//                 }
//               />
//             }
//             label={`Dinner ($${pricing.dinnerPrice} per person)`}
//           />

//           {/* Price Calculation */}
//           <Typography variant="h6" sx={{ mt: 2 }}>
//             Total Price: ${calculatePrice().toFixed(2)}
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             Discount Applied: ${calculateDiscount().toFixed(2)}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleConfirmBooking}
//             disabled={
//               loading ||
//               !dateRange[0] ||
//               !dateRange[1] ||
//               !email ||
//               !name ||
//               isDateUnavailable(dateRange[0]) ||
//               isDateUnavailable(dateRange[1])
//             }
//           >
//             {loading ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : (
//               "Confirm Booking"
//             )}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Notification */}
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseNotification}
//           severity={notification.severity}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default BookingModal;




import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { enqueueSnackbar } from "notistack";
// import { httpsCallable } from "firebase/functions";
// import { functions } from "./firebaseConfig"; // Import functions from your Firebase config

interface BookingModalProps {
  open: boolean;
  handleClose: () => void;
  selectedRoom: {
    id: string;
    title: string;
    price: number;
    price_extra: number;
    capacity: number;
  };
  pricing: {
    lunchPrice: number;
    dinnerPrice: number;
    discountRate: number;
  }
}

const BookingModal: React.FC<BookingModalProps> = ({
  open,
  handleClose,
  selectedRoom,
  pricing
}) => {
  const [headCount, setHeadCount] = useState(1);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [mealOptions, setMealOptions] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Example unavailable date ranges
  const unavailableDateRanges = [
    { start: new Date(2024, 10, 25), end: new Date(2024, 10, 27) },
    { start: new Date(2024, 11, 10), end: new Date(2024, 11, 12) },
  ];

  const isDateUnavailable = (date: Date) => {
    return unavailableDateRanges.some(
      (range) => date >= range.start && date <= range.end
    );
  };

  const handleHeadCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > selectedRoom.capacity) {
      enqueueSnackbar(`Maximum ${selectedRoom.capacity} people allowed per room.`, { variant: "warning" });
    } else {
      setHeadCount(value);
    }
  };

  const calculateDiscount = () => {
    const [checkInDate, checkOutDate] = dateRange;
    if (!checkInDate || !checkOutDate) return 0;

    const days = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (days <= 1) return 0;

    const dailyRoomCost = selectedRoom.price + selectedRoom.price_extra * (headCount - 1);
    return dailyRoomCost * (pricing.discountRate/100) * (days - 1);
  };

  const calculatePrice = () => {
    const [checkInDate, checkOutDate] = dateRange;
    if (!checkInDate || !checkOutDate) return 0;

    const days = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const dailyRoomCost = selectedRoom.price + selectedRoom.price_extra * (headCount - 1);
    const roomCost = dailyRoomCost * days - calculateDiscount();

    const mealsCost = headCount * days * (
      +mealOptions.lunch * pricing.lunchPrice +
      +mealOptions.dinner * pricing.dinnerPrice
    );

    return roomCost + mealsCost;
  };

  const handleConfirmBooking = async () => {
    const [checkInDate, checkOutDate] = dateRange;
    if (!checkInDate || !checkOutDate || !name || !phone) {
      enqueueSnackbar("Please fill in all required fields", { variant: "error" });
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        roomId: selectedRoom.id,
        roomTitle: selectedRoom.title,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        headCount,
        customerName: name,
        customerEmail: email || "Not provided",
        customerPhone: phone,
        mealOptions,
        discount: calculateDiscount(),
        totalPrice: calculatePrice(),
        createdAt: serverTimestamp(),
        status: "pending",
      };

      const bookingRef = await addDoc(collection(db, "bookings"), bookingData);
      const bookingId = bookingRef.id;

            // Call Cloud Function to send emails
      // const sendBookingEmails = httpsCallable(functions, "sendBookingEmails");
      // await sendBookingEmails({
      //   booking: {
      //     id: bookingId,
      //     customerName: name,
      //     customerEmail: email,
      //     customerPhone: phone || "Not provided",
      //     roomTitle: selectedRoom.title,
      //     checkInDate: checkInDate.toISOString(),
      //     checkOutDate: checkOutDate.toISOString(),
      //     headCount,
      //     mealOptions: {
      //       breakfast: mealOptions.breakfast,
      //       lunch: mealOptions.lunch,
      //       dinner: mealOptions.dinner,
      //     },
      //     discount: calculateDiscount(),
      //     totalPrice: calculatePrice(),
      //   }
      // });

      // Prepare WhatsApp message
      const message = `
        *Booking Confirmation*:
        Booking ID: ${bookingId}
        Room: ${selectedRoom.title}
        Check-in: ${checkInDate.toLocaleDateString()}
        Check-out: ${checkOutDate.toLocaleDateString()}
        Head Count: ${headCount}
        Customer: ${name}
        Phone: ${phone}
        Email: ${email || "Not provided"}
        Meals: 
          - Breakfast: ${mealOptions.breakfast ? "Yes" : "No"}
          - Lunch: ${mealOptions.lunch ? "Yes" : "No"}
          - Dinner: ${mealOptions.dinner ? "Yes" : "No"}
        Discount: $${calculateDiscount().toFixed(2)}
        Total Price: $${calculatePrice().toFixed(2)}
      `;

      // Open WhatsApp in new tab
      window.open(`https://wa.me/+94774010635?text=${encodeURIComponent(message)}`, "_blank");

      enqueueSnackbar("Booking confirmed! Check your WhatsApp for details.", { variant: "success" });

      // Close modal after success
      setTimeout(() => {
        handleClose();
        resetForm();
      }, 2000);
    } catch (error) {
      console.error("Error saving booking:", error);
      enqueueSnackbar("Error saving booking. Please try again.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setHeadCount(1);
    setDateRange([null, null]);
    setMealOptions({
      breakfast: false,
      lunch: false,
      dinner: false,
    });
    setEmail("");
    setName("");
    setPhone("");
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Book {selectedRoom?.title || "Room"}</DialogTitle>
      <DialogContent>
        {/* Customer Information */}
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          Your Information:
        </Typography>
        <TextField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="dense"
          required
        />
        <TextField
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="dense"
          required
          helperText="Required for booking confirmation"
        />
        <TextField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="dense"
          helperText="Optional"
        />

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          Select your booking dates:
        </Typography>

        {/* Date Range Picker */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
            disablePast
            shouldDisableDate={isDateUnavailable}
            renderInput={(startProps, endProps) => (
              <>
                <TextField
                  {...startProps}
                  fullWidth
                  margin="dense"
                  label="Check-in Date"
                />
                <TextField
                  {...endProps}
                  fullWidth
                  margin="dense"
                  label="Check-out Date"
                />
              </>
            )}
          />
        </LocalizationProvider>

        {/* Head Count */}
        <TextField
          label="Head Count"
          type="number"
          InputProps={{ inputProps: { min: 1, max: selectedRoom.capacity } }}
          value={headCount}
          onChange={handleHeadCountChange}
          fullWidth
          margin="dense"
        />

        {/* Meal Options */}
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          Meal Options:
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={mealOptions.breakfast}
              onChange={() => setMealOptions(prev => ({ ...prev, breakfast: !prev.breakfast }))}
            />
          }
          label="Breakfast (Free)"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={mealOptions.lunch}
              onChange={() => setMealOptions(prev => ({ ...prev, lunch: !prev.lunch }))}
            />
          }
          label={`Lunch ($${pricing.lunchPrice} per person)`}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={mealOptions.dinner}
              onChange={() => setMealOptions(prev => ({ ...prev, dinner: !prev.dinner }))}
            />
          }
          label={`Dinner ($${pricing.dinnerPrice} per person)`}
        />

        {/* Price Calculation */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Total Price: ${calculatePrice().toFixed(2)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Discount Applied: ${calculateDiscount().toFixed(2)}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmBooking}
          disabled={
            loading ||
            !dateRange[0] ||
            !dateRange[1] ||
            !name ||
            !phone ||
            isDateUnavailable(dateRange[0]) ||
            isDateUnavailable(dateRange[1])
          }
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Confirm Booking"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;