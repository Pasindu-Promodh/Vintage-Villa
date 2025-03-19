// import * as React from "react";
// import AppFooter from "./modules/views/AppFooter";
// import AppAppBar from "./modules/views/AppAppBar";
// import withRoot from "./modules/withRoot";
// import {
//   Container,
//   Box,
//   Grid,
//   Typography,
//   Button,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";  // Import from material/styles instead
// import { useState } from "react";
// import BookingModal from "./BookingModal";

// // Styled Components for visual enhancement
// const RoomCard = styled(Card)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   height: "100%",
//   boxShadow: theme.shadows[1],  // Use index for shadows
//   transition: "transform 0.3s ease-in-out",
//   "&:hover": {
//     transform: "scale(1.03)",
//   },
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

// const ImageContainer = styled(Box)(({ theme }) => ({
//   position: "relative",
//   marginBottom: theme.spacing(4),
//   "& img": {
//     width: "100%",
//     borderRadius: theme.shape.borderRadius,
//     cursor: "pointer",
//   },
//   "& .overlay": {
//     position: "absolute",
//     top: "10px",
//     left: "10px",
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: "18px",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
//     borderRadius: "5px",
//     textAlign: "center",
//   },
// }));

// // Room Package Data
// const roomPackages = [
//   {
//     title: "Standard Room",
//     description:
//       "Our cozy Standard Room offers a comfortable stay with all the essential amenities, perfect for travelers who value simplicity and comfort. Enjoy a queen-sized bed, and a stunning view of the garden.",
//     price: 50,
//     price_extra: 10,
//     image: "/gallery/WhatsApp Image 2024-11-15 at 20.46.36_1b9d01d4.jpg",
//   },
//   {
//     title: "Luxury Family Suite",
//     description:
//       "Experience ultimate luxury in our top-tier suite. With a separate living area, two bedrooms, and a panoramic view of the Knuckles Mountains, this suite offers the pinnacle of comfort and elegance.",
//     price: 55,
//     price_extra: 15,
//     image: "/reservations/IMG_0339.JPG",
//   },
// ];

// function Reservations() {
//   const [selectedRoom, setSelectedRoom] = useState<any>();
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleOpen = (room: any) => {
//     setSelectedRoom(room);
//     setModalOpen(true);
//   };

//   // Handle image click to go to the gallery page with the tag
//   const handleImageClick = (tag: string) => {
//     // Navigate to the gallery page and pass the tag as a query parameter
//     window.location.href = `/gallery?tag=${tag}`;
//   };

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
//             needs. Whether you're traveling solo, with family, or celebrating a
//             special occasion, we have the perfect room for you.
//           </Typography>
//         </Box>

//         {/* Room Packages Section */}
//         <SectionTitle variant="h4">Our Room Packages</SectionTitle>
//         <Grid container spacing={4} justifyContent="center">
//           {roomPackages.map((room, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
//               <RoomCard>
//                 <ImageContainer>
//                   <Button
//                     onClick={() => handleImageClick(room.title)} // Open gallery for more photos
//                     sx={{
//                       p: 0,
//                       borderRadius: "8px",
//                       "& img": {
//                         width: "100%",
//                         borderRadius: "8px",
//                       },
//                     }}
//                   >
//                     <img src={room.image} alt={room.title} />
//                   </Button>
//                   <Box className="overlay">More Photos</Box>
//                 </ImageContainer>
//                 <CardContent>
//                   <Typography variant="h5" gutterBottom>
//                     {room.title}
//                   </Typography>
//                   <Typography variant="body2" paragraph>
//                     {room.description}
//                   </Typography>
//                   <PriceTypography variant="h6">
//                     ${room.price} / night
//                   </PriceTypography>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     sx={{ mt: 2 }}
//                     onClick={() => handleOpen(room)}
//                   >
//                     Book Now
//                   </Button>
//                 </CardContent>
//               </RoomCard>
//             </Grid>
//           ))}
//         </Grid>

//         <BookingModal
//           open={modalOpen}
//           handleClose={() => setModalOpen(false)}
//           selectedRoom={selectedRoom}
//         />

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
import zIndex from "@mui/material/styles/zIndex";

const RoomCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15), 0 3px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 16px 32px rgba(0, 0, 0, 0.2), 0 6px 16px rgba(0, 0, 0, 0.15)",
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
    height: "200px",
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
  },
  "& .overlay": {
    position: "absolute",
    top: "10px",
    left: "10px",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
    borderRadius: "5px",
    textAlign: "center",
    zIndex: 3,
  },
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

const AmenitiesContainer = styled(Box)(() => ({
  marginBottom: "16px",
  minHeight: "24px",
}));

const PriceContainer = styled(Box)(() => ({
  marginBottom: "16px",
}));

const DefaultRoomImage = styled(Box)(() => ({
  width: "100%",
  height: "200px",
  backgroundColor: "#000000", // Black background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
  position: "relative", // Ensure proper positioning
}));

// Room Interface
interface Room {
  id: string;
  title: string;
  description: string;
  price: number;
  price_extra: number;
  image: string;
  isActive: boolean;
  displayOrder: number;
  capacity: number;
  amenities: string[];
}

interface PricingSettings {
  lunchPrice: number;
  dinnerPrice: number;
  discountRate: number;
  lastUpdated: number;
}

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
              <Grid item xs={12} sm={6} md={4} key={room.id}>
                <RoomCard>
                  <ImageContainer>
                    <Button
                      onClick={() => handleImageClick(room.title)}
                      sx={{
                        p: 0,
                        width: "100%",
                        height: "200px",
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
                        />
                      )}
                    </Button>
                    <Box className="overlay">More Photos</Box>
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

                    <AmenitiesContainer>
                      <Typography variant="body2">
                        Capacity: {room.capacity}{" "}
                        {room.capacity > 1 ? "guests" : "guest"}
                      </Typography>
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
