import * as React from "react";
import { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BookingModal from "./BookingModal";
import { db } from "./firebaseConfig"; // Import Firebase db
import { collection, getDocs, doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { Room, PricingSettings } from "./modules/components/Types";

const RoomCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%", // Ensure full width
  maxWidth: "100%", // Prevent any constraints
  boxShadow: "0 16px 32px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4), 0 12px 24px rgba(0, 0, 0, 0.3)",
  },
}));

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

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  marginBottom: theme.spacing(2),
  "& img": {
    width: "100%",
    height: "250px", // Changed from 200px to 250px
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
  },
  // Remove the overlay styles since we'll use a button
}));

const ContentContainer = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: theme.spacing(2),
}));

const DescriptionContainer = styled(Box)(() => ({
  minHeight: "100px",
  marginBottom: "16px",
}));

const CapacityContainer = styled(Box)(() => ({
  marginBottom: "16px",
}));

const AmenitiesContainer = styled(Box)(() => ({
  marginBottom: "16px",
  minHeight: "24px",
}));

const PriceContainer = styled(Box)(() => ({
  marginBottom: "16px",
}));

const DefaultRoomImage = styled(Box)(() => ({
  width: "100%",
  height: "250px", // Changed from 200px to 250px
  backgroundColor: "#000000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
  position: "relative",
}));

function Reservations() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [pricingSettings, setPricingSettings] = useState<PricingSettings>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch rooms from Firestore
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "rooms"));
        const roomsList = querySnapshot.docs
          .map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            } as Room;
          })
          .filter((room) => room.isActive); // Only show active rooms

        // Sort by display order
        roomsList.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setRooms(roomsList);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Failed to load rooms. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchPricingSettings = async () => {
      try {
        const pricingDoc = await getDoc(doc(db, "settings", "pricing"));

        if (pricingDoc.exists()) {
          const data = pricingDoc.data() as PricingSettings;
          setPricingSettings(data);
        }
      } catch (err) {
        console.error("Error fetching pricing settings:", err);
        setError("Failed to load pricing settings. Please try again.");
      }
    };

    fetchRooms();
    fetchPricingSettings();
  }, []);

  const handleOpen = (room: Room) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  // Handle image click to go to the gallery page with the tag
  const handleImageClick = (tag: string) => {
    // Navigate to the gallery page and pass the tag as a query parameter
    window.location.href = `/gallery?tag=${tag}`;
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
            needs. Whether you're traveling solo, with family, or celebrating a
            special occasion, we have the perfect room for you.
          </Typography>
        </Box>

        {/* Room Packages Section */}
        <SectionTitle variant="h4">Our Room Packages</SectionTitle>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: "center", p: 4 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {rooms.map((room) => (
              <Grid item xs={12} sm={6} md={5} key={room.id}>
                <RoomCard>
                  <ImageContainer>
                    <Button
                      onClick={() => handleImageClick(room.title)}
                      sx={{
                        p: 0,
                        width: "100%",
                        height: "250px", // Changed from 200px to 250px
                        borderRadius: "8px",
                        position: "relative",
                      }}
                    >
                      {/* Show loading state while image is loading or missing */}
                      <DefaultRoomImage>
                        <CircularProgress
                          size={60}
                          thickness={4}
                          sx={{
                            color: "#D4AF37",
                            position: "absolute",
                            zIndex: 1,
                          }}
                        />
                      </DefaultRoomImage>

                      {/* Image with onLoad handler to hide loading state */}
                      {room.image && (
                        <img
                          src={room.image}
                          alt={room.title}
                          style={{
                            backgroundColor: "#000000",
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                            borderRadius: "8px",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 2,
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                          }}
                          onLoad={(e) => {
                            // When loaded, make visible
                            (e.target as HTMLImageElement).style.opacity = "1";
                          }}
                          onError={(e) => {
                            // On error, show default
                            (e.target as HTMLImageElement).src = "/logo.png";
                            (e.target as HTMLImageElement).style.opacity = "1";
                          }}
                          loading="lazy"
                        />
                      )}
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent button click
                        handleImageClick(room.title);
                      }}
                      sx={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        zIndex: 5,
                      }}
                    >
                      More Photos
                    </Button>
                  </ImageContainer>
                  <ContentContainer>
                    <Typography variant="h5" gutterBottom>
                      {room.title}
                    </Typography>

                    <DescriptionContainer>
                      <Typography variant="body2">
                        {room.description}
                      </Typography>
                    </DescriptionContainer>

                    <CapacityContainer>
                      {" "}
                      <Typography variant="body2">
                        Capacity: {room.capacity}{" "}
                        {room.capacity > 1 ? "guests" : "guest"}
                      </Typography>
                    </CapacityContainer>
                    <AmenitiesContainer>
                      {room.amenities && room.amenities.length > 0 && (
                        <Typography variant="body2">
                          Includes: {room.amenities.join(", ")}
                        </Typography>
                      )}
                    </AmenitiesContainer>

                    <PriceContainer>
                      <PriceTypography variant="h6">
                        ${room.price} / night
                      </PriceTypography>
                      <Typography variant="body2">
                        Additional guest: ${room.price_extra} / night
                      </Typography>
                    </PriceContainer>

                    <Box sx={{ mt: "auto" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleOpen(room)}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </ContentContainer>
                </RoomCard>
              </Grid>
            ))}
          </Grid>
        )}

        {selectedRoom && (
          <BookingModal
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            selectedRoom={selectedRoom}
            pricing={pricingSettings!}
          />
        )}

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
