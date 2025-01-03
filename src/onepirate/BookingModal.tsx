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
} from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const BookingModal = ({ open, handleClose, selectedRoom }: any) => {
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

  // Example unavailable date ranges
  const unavailableDateRanges = [
    { start: new Date(2024, 10, 25), end: new Date(2024, 10, 27) }, // Nov 25–27, 2024
    { start: new Date(2024, 11, 10), end: new Date(2024, 11, 12) }, // Dec 10–12, 2024
  ];

  // Check if a date falls within any unavailable range
  const isDateUnavailable = (date: Date) => {
    return unavailableDateRanges.some(
      (range) => date >= range.start && date <= range.end
    );
  };

  const handleHeadCountChange = (e: any) => {
    const value = Number(e.target.value);
    if (value > 4) {
      alert("Maximum 4 people allowed per room.");
    } else {
      setHeadCount(value);
    }
  };

  const calculateDiscount = () => {
    const [checkInDate, checkOutDate] = dateRange;
    if (!checkInDate || !checkOutDate) return 0;

    const days = Math.ceil(
      (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (days <= 1) return 0;

    // Calculate total room cost per day (base + additional persons)
    const dailyRoomCost =
      selectedRoom.price + (selectedRoom.price_extra) * (headCount - 1);

    // Apply 25% discount for each additional day
    return dailyRoomCost * 0.25 * (days - 1);
  };

  const calculatePrice = () => {
    const [checkInDate, checkOutDate] = dateRange;
    if (!checkInDate || !checkOutDate) return 0;

    const days = Math.ceil(
      (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    // Calculate total room cost per day (base + additional persons)
    const dailyRoomCost =
      selectedRoom.price + (selectedRoom.price_extra) * (headCount - 1);

    // Total room cost for the stay, minus discount
    const roomCost = dailyRoomCost * days - calculateDiscount();

    // Meal cost
    const mealsCost =
      headCount * days *
      (+mealOptions.breakfast * 0 +
        +mealOptions.lunch * 6 +
        +mealOptions.dinner * 8);

    return roomCost + mealsCost;
  };

  const handleConfirmBooking = () => {
    const [checkInDate, checkOutDate] = dateRange;
    if (!checkInDate || !checkOutDate) return;

    const message = `
      *Booking Confirmation*:
      Room: ${selectedRoom?.title}
      Check-in: ${checkInDate.toLocaleDateString()}
      Check-out: ${checkOutDate.toLocaleDateString()}
      Head Count: ${headCount}
      Meals: 
        - Breakfast: ${mealOptions.breakfast ? "Yes" : "No"}
        - Lunch: ${mealOptions.lunch ? "Yes" : "No"}
        - Dinner: ${mealOptions.dinner ? "Yes" : "No"}
      Discount: $${calculateDiscount().toFixed(2)}
      Total Price: $${calculatePrice().toFixed(2)}
    `;

    const whatsappURL = `https://wa.me/+94774010635?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Book {selectedRoom?.title || "Room"}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
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
          InputProps={{ inputProps: { min: 1, max: 4 } }}
          value={headCount}
          onChange={handleHeadCountChange}
          fullWidth
          margin="dense"
        />

        {/* Meal Options */}
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
          label="Lunch ($8 per person)"
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
          label="Dinner ($10 per person)"
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
            !dateRange[0] ||
            !dateRange[1] ||
            isDateUnavailable(dateRange[0]) ||
            isDateUnavailable(dateRange[1])
          }
        >
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
