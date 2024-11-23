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

  const calculatePrice = () => {
    const [checkInDate, checkOutDate] = dateRange;
    if (!checkInDate || !checkOutDate) return 0;

    const days = Math.ceil(
      (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const roomBasePrice = selectedRoom.price;
    const additionalPersonPrice = (roomBasePrice/2) * (headCount - 1);
    const mealsPrice =
      headCount *
      (+mealOptions.breakfast * 0 +
        +mealOptions.lunch * 8 +
        +mealOptions.dinner * 10);

    const roomCost = roomBasePrice + additionalPersonPrice;
    const discount = days > 1 ? roomBasePrice * 0.25 * (days - 1) : 0;

    return roomCost * days + mealsPrice - discount;
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
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
