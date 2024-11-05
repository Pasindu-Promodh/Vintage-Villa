// import * as React from "react";
// import AppFooter from "./modules/views/AppFooter";
// import AppAppBar from "./modules/views/AppAppBar";
// import withRoot from "./modules/withRoot";
// import { Container } from "@mui/material";

// import {  Box, Grid, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
// import { styled } from "@mui/system";

// // Styled Components for visual enhancement
// const RoomCard = styled(Card)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   height: "100%",
//   boxShadow: theme.shadows,
//   transition: "transform 0.3s ease-in-out",
//   "&:hover": {
//     transform: "scale(1.03)",
//   },
// }));

// const RoomCardMedia = styled(CardMedia)(({ theme }) => ({
//   height: 200,
//   borderRadius: theme.shape.borderRadius,
// }));

// const SectionTitle = styled(Typography)(({ theme }) => ({
//   marginBottom: theme.spacing(4),
//   fontWeight: "bold",
//   textTransform: "uppercase",
//   color: theme.palette.primary.main,
//   textAlign: "center",
// }));

// const PriceTypography = styled(Typography)(({ theme }) => ({
//   color: theme.palette.secondary.main,
//   fontWeight: "bold",
// }));

// // Room Package Data
// const roomPackages = [
//   {
//     title: "Standard Room",
//     description:
//       "Our cozy Standard Room offers a comfortable stay with all the essential amenities, perfect for travelers who value simplicity and comfort. Enjoy a queen-sized bed, complimentary Wi-Fi, and a stunning view of the garden.",
//     price: "$100 / night",
//     image: "/rooms/standard-room.jpg",
//     alt: "Standard Room",
//   },
//   {
//     title: "Deluxe Room",
//     description:
//       "Upgrade your experience with our Deluxe Room. Featuring a king-sized bed, a private balcony with mountain views, a luxurious bathroom, and premium linens, it's an ideal choice for couples or small families.",
//     price: "$150 / night",
//     image: "/rooms/deluxe-room.jpg",
//     alt: "Deluxe Room",
//   },
//   {
//     title: "Family Suite",
//     description:
//       "The spacious Family Suite is designed for families or groups, offering two interconnected rooms, a cozy living area, and a private balcony. Perfect for those who need a bit more space to relax and unwind.",
//     price: "$220 / night",
//     image: "/rooms/family-suite.jpg",
//     alt: "Family Suite",
//   },
//   {
//     title: "Luxury Suite",
//     description:
//       "Experience ultimate luxury in our top-tier suite. With a separate living area, two bedrooms, a private jacuzzi, and a panoramic view of the Knuckles Mountains, this suite offers the pinnacle of comfort and elegance.",
//     price: "$350 / night",
//     image: "/rooms/luxury-suite.jpg",
//     alt: "Luxury Suite",
//   },
//   {
//     title: "Honeymoon Package",
//     description:
//       "Celebrate your love in our specially curated Honeymoon Suite. This package includes a private dinner under the stars, complimentary champagne, and spa access. Perfect for newlyweds seeking a romantic escape.",
//     price: "$400 / night",
//     image: "/rooms/honeymoon-suite.jpg",
//     alt: "Honeymoon Package",
//   },
// ];

// function Reservations() {
  

//   return (
//     <React.Fragment>
//       <AppAppBar />
//       <Container maxWidth="lg" sx={{ py: 8 }}>
//         {/* Introduction */}
//         <Box sx={{ textAlign: "center", mb: 8 }}>
//           <Typography variant="h3" gutterBottom>
//             Reserve Your Stay with Us
//           </Typography>
//           <Typography variant="body1" paragraph>
//             Discover a range of room options and packages designed to meet your
//             needs. Whether you’re traveling solo, with family, or celebrating a
//             special occasion, we have the perfect room for you.
//           </Typography>
//         </Box>

//         {/* Room Packages Section */}
//         <SectionTitle variant="h4">Our Room Packages</SectionTitle>
//         <Grid container spacing={4}>
//           {roomPackages.map((room, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <RoomCard>
//                 <RoomCardMedia
//                   // image={room.image}
//                   image={
//                     "https://www.vanorohotel.com/wp-content/uploads/2021/07/drz-vanoro_6737.jpg"
//                   }
//                 />
//                 <CardContent>
//                   <Typography variant="h5" gutterBottom>
//                     {room.title}
//                   </Typography>
//                   <Typography variant="body2" paragraph>
//                     {room.description}
//                   </Typography>
//                   <PriceTypography variant="h6">{room.price}</PriceTypography>
//                   <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//                     Book Now
//                   </Button>
//                 </CardContent>
//               </RoomCard>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Closing Statement */}
//         <Box sx={{ mt: 8, textAlign: "center" }}>
//           <Typography variant="h5" gutterBottom>
//             Book your stay today and experience the serene beauty of the
//             Knuckles Mountains.
//           </Typography>
//           <Typography variant="body1">
//             We look forward to welcoming you to our boutique hotel. Each of our
//             rooms and packages has been crafted to ensure your stay is as
//             comfortable and memorable as possible.
//           </Typography>
//         </Box>
//       </Container>
//       <AppFooter />
//     </React.Fragment>
//   );
// }

// export default withRoot(Reservations);




import * as React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled Components for visual enhancement
const RoomCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  boxShadow: theme.shadows,
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));

const RoomCardMedia = styled(CardMedia)({
  height: 200,
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: "bold",
  textTransform: "uppercase",
  color: theme.palette.primary.main,
  textAlign: "center",
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: "bold",
}));

// Room Package Data
const roomPackages = [
  {
    title: "Standard Room",
    description:
      "Our cozy Standard Room offers a comfortable stay with all the essential amenities, perfect for travelers who value simplicity and comfort. Enjoy a queen-sized bed, complimentary Wi-Fi, and a stunning view of the garden.",
    price: 100,
    image: "/rooms/standard-room.jpg",
  },
  {
    title: "Deluxe Room",
    description:
      "Upgrade your experience with our Deluxe Room. Featuring a king-sized bed, a private balcony with mountain views, a luxurious bathroom, and premium linens, it's an ideal choice for couples or small families.",
    price: 150,
    image: "/rooms/deluxe-room.jpg",
  },
  {
    title: "Family Suite",
    description:
      "The spacious Family Suite is designed for families or groups, offering two interconnected rooms, a cozy living area, and a private balcony. Perfect for those who need a bit more space to relax and unwind.",
    price: 220,
    image: "/rooms/family-suite.jpg",
  },
  {
    title: "Luxury Suite",
    description:
      "Experience ultimate luxury in our top-tier suite. With a separate living area, two bedrooms, a private jacuzzi, and a panoramic view of the Knuckles Mountains, this suite offers the pinnacle of comfort and elegance.",
    price: 350,
    image: "/rooms/luxury-suite.jpg",
  },
  {
    title: "Honeymoon Package",
    description:
      "Celebrate your love in our specially curated Honeymoon Suite. This package includes a private dinner under the stars, complimentary champagne, and spa access. Perfect for newlyweds seeking a romantic escape.",
    price: 400,
    image: "/rooms/honeymoon-suite.jpg",
  },
];

function Reservations() {
  const [open, setOpen] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState<any>();
  const [headCount, setHeadCount] = React.useState(1);
  const [mealOptions, setMealOptions] = React.useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  // const basePrices = {
  //   "Standard Room": 100,
  //   "Deluxe Room": 150,
  //   "Family Suite": 220,
  //   "Luxury Suite": 350,
  //   "Honeymoon Package": 400,
  // };

  // const mealPrices = { breakfast: 10, lunch: 15, dinner: 20 };

  const calculatePrice = () => {
    if (!selectedRoom) return 0;
    let totalPrice = selectedRoom.price * headCount;
    // Object.keys(mealOptions).forEach((meal) => {
    //   if (mealOptions[meal]) {
    //     totalPrice += mealPrices[meal] * headCount;
    //   }
    // });
    return totalPrice;
  };

  const handleOpen = (room: any) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setHeadCount(1);
    setMealOptions({ breakfast: false, lunch: false, dinner: false });
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Introduction */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" gutterBottom>
            Reserve Your Stay with Us
          </Typography>
          <Typography variant="body1" paragraph>
            Discover a range of room options and packages designed to meet your
            needs. Whether you’re traveling solo, with family, or celebrating a
            special occasion, we have the perfect room for you.
          </Typography>
        </Box>

        {/* Room Packages Section */}
        <SectionTitle variant="h4">Our Room Packages</SectionTitle>
        <Grid container spacing={4}>
          {roomPackages.map((room, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <RoomCard>
                <RoomCardMedia
                  image="https://www.vanorohotel.com/wp-content/uploads/2021/07/drz-vanoro_6737.jpg"
                  title={room.title}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {room.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {room.description}
                  </Typography>
                  <PriceTypography variant="h6">
                    ${room.price} / night
                  </PriceTypography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => handleOpen(room)}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </RoomCard>
            </Grid>
          ))}
        </Grid>

        {/* Booking Modal */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Book {selectedRoom?.title}</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1" gutterBottom>
              Customize your booking:
            </Typography>
            <TextField
              label="Head Count"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 10 } }}
              value={headCount}
              onChange={(e) => setHeadCount(Number(e.target.value))}
              fullWidth
              margin="dense"
            />
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
              label="Breakfast ($10 per person)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={mealOptions.lunch}
                  onChange={() =>
                    setMealOptions((prev) => ({
                      ...prev,
                      lunch: !prev.lunch,
                    }))
                  }
                />
              }
              label="Lunch ($15 per person)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={mealOptions.dinner}
                  onChange={() =>
                    setMealOptions((prev) => ({
                      ...prev,
                      dinner: !prev.dinner,
                    }))
                  }
                />
              }
              label="Dinner ($20 per person)"
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total Price: ${calculatePrice().toFixed(2)}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Confirm Booking
            </Button>
          </DialogActions>
        </Dialog>

        {/* Closing Statement */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Book your stay today and experience the serene beauty of the
            Knuckles Mountains.
          </Typography>
          <Typography variant="body1">
            We look forward to welcoming you to our boutique hotel. Each of our
            rooms and packages has been crafted to ensure your stay is as
            comfortable and memorable as possible.
          </Typography>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Reservations);
