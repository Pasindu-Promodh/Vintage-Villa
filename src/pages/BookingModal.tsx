import React, { useEffect, useMemo, useState } from "react";
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
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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
import { addDays, isWithinInterval, parseISO, eachDayOfInterval, isSameDay, isBefore, startOfDay, differenceInCalendarDays } from "date-fns";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../App.css";

// import { httpsCallable } from "firebase/functions";
// import { functions } from "./firebaseConfig"; // Import functions from your Firebase config

const BookingModal: React.FC<BookingModalProps> = ({
  open,
  handleClose,
  selectedRoom,
  pricing,
}) => {
  // const [headCount, setHeadCount] = useState(1);
  const [headCount, setHeadCount] = useState<number | "">(1);

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
  const [phoneError, setPhoneError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unavailableDateRanges, setUnavailableDateRanges] = useState<
    UnavailableDates[]
  >([]);
  const [confirmedBookings, setConfirmedBookings] = useState<Booking[]>([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          where("status", "==", "confirmed"),
        );
        const bookingsSnapshot = await getDocs(confirmedBookingsQuery);

        const confirmedBookingsList: Booking[] = bookingsSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          }),
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

  // Flat list of individual booked/unavailable dates, for the calendar to
  // grey out and mark visually.
  const disabledDates = useMemo(() => {
    const dates: Date[] = [];

    unavailableDateRanges.forEach((range) => {
      const start = parseISO(range.startDate);
      const end = parseISO(range.endDate);
      dates.push(...eachDayOfInterval({ start, end }));
    });

    confirmedBookings.forEach((booking) => {
      const start = parseISO(booking.checkInDate);
      const end = parseISO(booking.checkOutDate);
      dates.push(...eachDayOfInterval({ start, end }));
    });

    return dates;
  }, [unavailableDateRanges, confirmedBookings]);

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

  // Adapts react-date-range's selection object into our [start, end] tuple
  const handleCalendarRangeChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    handleDateRangeChange([startDate ?? null, endDate ?? null]);
  };

  const calendarSelectionRange = {
    startDate: dateRange[0] ?? new Date(),
    endDate: dateRange[1] ?? dateRange[0] ?? new Date(),
    key: "selection",
  };

  const handleHeadCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow clearing the field (for backspace)
    if (value === "") {
      setHeadCount("");
      return;
    }

    const num = Number(value);

    // Ignore non-numbers
    if (Number.isNaN(num)) return;

    // Hard limits
    if (num < 1) {
      setHeadCount(1);
      return;
    }

    if (num > selectedRoom.capacity) {
      enqueueSnackbar(`Maximum ${selectedRoom.capacity} people allowed.`, {
        variant: "warning",
      });
      setHeadCount(selectedRoom.capacity);
      return;
    }

    setHeadCount(num);
  };

  const calculateDiscount = () => {
    const [checkInDate, checkOutDate] = dateRange;
    if (!checkInDate || !checkOutDate) return 0;

    if (headCount === "") return 0;

    const days = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (days <= 1) return 0;

    const dailyRoomCost =
      selectedRoom.price + selectedRoom.price_extra * (headCount - 1);
    return dailyRoomCost * (pricing.discountRate / 100) * (days - 1);
  };

  const calculatePrice = () => {
    const [checkInDate, checkOutDate] = dateRange;
    if (!checkInDate || !checkOutDate) return 0;
    if (headCount === "") return 0;

    const days = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
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

    if (!matchIsValidTel(phone)) {
      setPhoneError(true);
      enqueueSnackbar("Please enter a valid phone number", {
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

      await addDoc(collection(db, "bookings"), bookingData);

      // Call Cloud Function to send emails
      // const sendBookingEmails = httpsCallable(functions, "sendBookingEmails");
      // await sendBookingEmails({
      //   booking: {
      //     id: bookingRef.id,
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

      // WhatsApp notification is now sent automatically in the background
      // by the onNewBooking Cloud Function as soon as this document is
      // created in Firestore — no action needed from the customer.

      enqueueSnackbar("Booking confirmed! We'll be in touch shortly.", {
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
    setPhoneError(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ px: isMobile ? 2 : 3 }}>Book {selectedRoom?.title || "Room"}</DialogTitle>
      <DialogContent sx={{ px: isMobile ? 2 : 3 }}>
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
        <MuiTelInput
          label="Phone Number"
          value={phone}
          onChange={(newValue) => {
            setPhone(newValue);
            setPhoneError(newValue !== "" && !matchIsValidTel(newValue));
          }}
          defaultCountry="LK"
          forceCallingCode
          fullWidth
          margin="dense"
          required
          error={phoneError}
          helperText={
            phoneError
              ? "Enter a valid phone number for the selected country"
              : "Required for booking confirmation"
          }
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
        <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              component="span"
              sx={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#fdecea",
                border: "1px solid #c62828",
              }}
            />
            Booked / unavailable
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              component="span"
              sx={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#eeeeee",
                border: "1px solid #9e9e9e",
              }}
            />
            Past date
          </Box>
        </Typography>

        {/* Date Range Calendar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            overflowX: "hidden",
            "& .rdrCalendarWrapper": {
              fontSize: 14,
              maxWidth: "100%",
              ...(isMobile && { width: "100%" }),
            },
            "& .rdrMonths": {
              flexWrap: "wrap",
              justifyContent: "center",
              ...(isMobile && { width: "100%" }),
            },
            // react-date-range hardcodes each month to a fixed em width.
            // On mobile that's wider than the screen and crops the last
            // column (Saturday), so force it to shrink to fit there - the
            // day cells inside are percentage-based, so they scale down
            // cleanly with it. On desktop, leave the library's own sizing
            // alone so the two months keep sitting side by side as before.
            "& .rdrMonth": isMobile
              ? {
                  width: "100%",
                  padding: "0 0.5em 1em 0.5em",
                }
              : {},
            ...(isMobile && {
              "& .rdrDateDisplayWrapper": {
                width: "100%",
              },
            }),
          }}
        >
          <DateRange
            ranges={[calendarSelectionRange]}
            onChange={handleCalendarRangeChange}
            minDate={new Date()}
            disabledDates={disabledDates}
            moveRangeOnFirstSelection={false}
            months={isMobile ? 1 : 2}
            direction={isMobile ? "vertical" : "horizontal"}
            rangeColors={["#99ff96"]}
            showDateDisplay
            dayContentRenderer={(date) => {
              const isBooked = disabledDates.some((d) => isSameDay(d, date));
              const isPast = isBefore(date, startOfDay(new Date()));

              let backgroundColor: string | undefined;
              let color: string | undefined;

              if (isBooked) {
                backgroundColor = "#ffa196";
                color = "#c62828";
              } else if (isPast) {
                backgroundColor = "#eeeeee";
                color = "#9e9e9e";
              }

              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 4,
                    backgroundColor,
                    color,
                  }}
                >
                  {date.getDate()}
                </div>
              );
            }}
          />
        </Box>

        {dateRange[0] && dateRange[1] && (
          <Typography
            variant="body2"
            sx={{ mt: 1, mb: 1, fontWeight: 500, textAlign: "center" }}
          >
            {(() => {
              const nights = differenceInCalendarDays(
                dateRange[1],
                dateRange[0]
              );
              return `${nights} night${nights !== 1 ? "s" : ""} selected`;
            })()}
          </Typography>
        )}

        {/* Head Count */}
        <TextField
          label={`Head Count (must be between 1 and ${selectedRoom.capacity})`}
          type="number"
          // InputProps={{ inputProps: { min: 1, max: selectedRoom.capacity } }}
          inputProps={{ min: 1, max: selectedRoom.capacity }}
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
            phoneError ||
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