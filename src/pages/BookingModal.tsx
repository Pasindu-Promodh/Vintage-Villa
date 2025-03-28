import React, { useEffect, useState } from "react";
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
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { enqueueSnackbar } from "notistack";
import {
  Booking,
  BookingModalProps,
  UnavailableDates,
} from "./modules/components/Types";
import { addDays, isWithinInterval, parseISO } from "date-fns";
import "../App.css";

// import { httpsCallable } from "firebase/functions";
// import { functions } from "./firebaseConfig"; // Import functions from your Firebase config

const BookingModal: React.FC<BookingModalProps> = ({
  open,
  handleClose,
  selectedRoom,
  pricing,
}) => {
  const [headCount, setHeadCount] = useState(1);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [mealOptions, setMealOptions] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [unavailableDateRanges, setUnavailableDateRanges] = useState<
    UnavailableDates[]
  >([]);
  const [confirmedBookings, setConfirmedBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const unavailableDatesCollection = collection(db, "unavailable_dates");
        const snapshot = await getDocs(unavailableDatesCollection);

        const datesList: UnavailableDates[] = snapshot.docs.map((doc) => ({
          // id: doc.id,
          ...doc.data(),
        })) as UnavailableDates[];

        // Fetch confirmed bookings for the specific room
        const bookingsCollection = collection(db, "bookings");
        const confirmedBookingsQuery = query(
          bookingsCollection,
          where("roomId", "==", selectedRoom.id),
          where("status", "==", "confirmed")
        );
        const bookingsSnapshot = await getDocs(confirmedBookingsQuery);

        const confirmedBookingsList: Booking[] = bookingsSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        ) as unknown as Booking[];

        setUnavailableDateRanges(datesList);
        setConfirmedBookings(confirmedBookingsList);
      } catch (err) {
        console.error("Error fetching unavailable dates:", err);
        enqueueSnackbar("Could not fetch unavailable dates", {
          variant: "error",
        });
      }
    };

    fetchUnavailableDates();
  }, [selectedRoom.id]);

  // Updated isDateUnavailable function to use fetched unavailable dates
  const isDateUnavailable = (date: Date) => {
    // Check predefined unavailable dates
    const isInUnavailableRange = unavailableDateRanges.some((range) => {
      const start = parseISO(range.startDate);
      const end = parseISO(range.endDate);
      return isWithinInterval(date, { start, end });
    });

    // Check confirmed bookings
    const isInConfirmedBooking = confirmedBookings.some((booking) => {
      const checkInDate = parseISO(booking.checkInDate);
      const checkOutDate = parseISO(booking.checkOutDate);
      return isWithinInterval(date, { start: checkInDate, end: checkOutDate });
    });

    return isInUnavailableRange || isInConfirmedBooking;
  };

  // Check if the entire date range is valid (no disabled dates in between)
  const isDateRangeValid = (start: Date | null, end: Date | null) => {
    if (!start || !end) return true;

    // Check every date in the range

    let currentDate = start;
    while (currentDate <= end) {
      if (isDateUnavailable(currentDate)) {
        return false;
      }
      currentDate = addDays(currentDate, 1);
    }
    return true;
  };

  // Handle date range change with validation
  const handleDateRangeChange = (newValue: [Date | null, Date | null]) => {
    const [start, end] = newValue;

    // If the new range includes any unavailable dates, show an error
    if (start && end && !isDateRangeValid(start, end)) {
      enqueueSnackbar("Selected dates include unavailable periods", {
        variant: "error",
      });
      return;
    }

    setDateRange(newValue);
  };

  const handleHeadCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > selectedRoom.capacity) {
      enqueueSnackbar(
        `Maximum ${selectedRoom.capacity} people allowed per room.`,
        { variant: "warning" }
      );
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

    const dailyRoomCost =
      selectedRoom.price + selectedRoom.price_extra * (headCount - 1);
    return dailyRoomCost * (pricing.discountRate / 100) * (days - 1);
  };

  const calculatePrice = () => {
    const [checkInDate, checkOutDate] = dateRange;
    if (!checkInDate || !checkOutDate) return 0;

    const days = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const dailyRoomCost =
      selectedRoom.price + selectedRoom.price_extra * (headCount - 1);
    const roomCost = dailyRoomCost * days - calculateDiscount();

    const mealsCost =
      headCount *
      days *
      (+mealOptions.lunch * pricing.lunchPrice +
        +mealOptions.dinner * pricing.dinnerPrice);

    return roomCost + mealsCost;
  };

  const handleConfirmBooking = async () => {
    const [checkInDate, checkOutDate] = dateRange;
    if (!checkInDate || !checkOutDate || !name || !phone) {
      enqueueSnackbar("Please fill in all required fields", {
        variant: "error",
      });
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
      window.open(
        `https://wa.me/+94774010635?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      enqueueSnackbar("Booking confirmed! Check your WhatsApp for details.", {
        variant: "success",
      });

      // Close modal after success
      setTimeout(() => {
        handleClose();
        resetForm();
      }, 2000);
    } catch (error) {
      console.error("Error saving booking:", error);
      enqueueSnackbar("Error saving booking. Please try again.", {
        variant: "error",
      });
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
          {/* <DateRangePicker
              value={dateRange}
              onChange={handleDateRangeChange}
              disablePast
              shouldDisableDate={isDateUnavailable}
              inputFormat="dd/MM/yyyy"
              renderInput={(startProps, endProps) => (
                <>
                  <TextField
                    {...startProps}
                    fullWidth
                    margin="dense"
                    label="Check-in Date"
                    helperText={
                      startProps.helperText || "Unavailable dates are disabled"
                    }
                  />
                  <TextField
                    {...endProps}
                    fullWidth
                    margin="dense"
                    label="Check-out Date"
                    helperText={
                      startProps.helperText || "Unavailable dates are disabled"
                    }
                  />
                </>
              )}
            /> */}

          <DateRangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            disablePast
            shouldDisableDate={isDateUnavailable}
            inputFormat="dd/MM/yyyy"
            
            className="custom-date-picker" // Add a custom class
            renderInput={(startProps, endProps) => (
              <>
                <TextField
                  {...startProps}
                  fullWidth
                  margin="dense"
                  label="Check-in Date"
                  helperText={
                    startProps.helperText || "Unavailable dates are disabled"
                  }
                />
                <TextField
                  {...endProps}
                  fullWidth
                  margin="dense"
                  label="Check-out Date"
                  helperText={
                    startProps.helperText || "Unavailable dates are disabled"
                  }
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
              onChange={() =>
                setMealOptions((prev) => ({
                  ...prev,
                  breakfast: !prev.breakfast,
                }))
              }
            />
          }
          label="Breakfast (Free)"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={mealOptions.lunch}
              onChange={() =>
                setMealOptions((prev) => ({ ...prev, lunch: !prev.lunch }))
              }
            />
          }
          label={`Lunch ($${pricing.lunchPrice} per person)`}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={mealOptions.dinner}
              onChange={() =>
                setMealOptions((prev) => ({ ...prev, dinner: !prev.dinner }))
              }
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
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
