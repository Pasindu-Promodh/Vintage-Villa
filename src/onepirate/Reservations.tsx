import * as React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import BookingModal from "./BookingModal";

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
      "Our cozy Standard Room offers a comfortable stay with all the essential amenities, perfect for travelers who value simplicity and comfort. Enjoy a queen-sized bed, and a stunning view of the garden.",
    price: 30,
    price_extra: 10,
    image: "/gallery/WhatsApp Image 2024-11-15 at 20.46.36_1b9d01d4.jpg",
  },
  {
    title: "Luxury Family Suite",
    description:
      "Experience ultimate luxury in our top-tier suite. With a separate living area, two bedrooms, and a panoramic view of the Knuckles Mountains, this suite offers the pinnacle of comfort and elegance.",
    price: 40,
    price_extra: 15,
    image: "/reservations/IMG_0339.JPG",
  },
];

function Reservations() {
  const [selectedRoom, setSelectedRoom] = useState<any>();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = (room: any) => {
    setSelectedRoom(room);
    setModalOpen(true);
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
                <RoomCardMedia image={room.image} title={room.title} />
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
                    // sx={{ mt: 2, display: "none" }}
                    sx={{ mt: 2 }}
                    onClick={() => handleOpen(room)}
                  >
                    Book Now
                  </Button>
                  {/* <Link
                    underline="none"
                    color="primary"
                    component={RouterLink}
                    to="/contact"
                    sx={{ mt: 2 }}
                  >
                    Book Now
                  </Link> */}
                </CardContent>
              </RoomCard>
            </Grid>
          ))}
        </Grid>

        <BookingModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          selectedRoom={selectedRoom}
        />

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
