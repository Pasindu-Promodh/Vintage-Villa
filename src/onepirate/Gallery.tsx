// import * as React from "react";
// import AppFooter from "./modules/views/AppFooter";
// import AppAppBar from "./modules/views/AppAppBar";
// import withRoot from "./modules/withRoot";
// import { Container, Box, Grid, Typography } from "@mui/material";
// import { styled } from "@mui/system";

// // Styled Component for the Image Container
// const ImageContainer = styled(Box)(({ theme }) => ({
//   marginBottom: theme.spacing(4),
//   "& img": {
//     width: "100%",
//     height: "auto",
//     borderRadius: theme.shape.borderRadius,
//     transition: "transform 0.3s ease-in-out",
//     "&:hover": {
//       transform: "scale(1.05)",
//     },
//   },
// }));

// const SectionTitle = styled(Typography)(({ theme }) => ({
//   marginBottom: theme.spacing(4),
//   fontWeight: "bold",
//   textTransform: "uppercase",
//   color: theme.palette.primary.main,
//   textAlign: "center",
// }));

// // Array of images for the gallery
// const galleryImages = [
//   {
//     src: "/gallery/property1.jpg",
//     alt: "Property View 1",
//   },
//   {
//     src: "/gallery/property2.jpg",
//     alt: "Property View 2",
//   },
//   {
//     src: "/gallery/property3.jpg",
//     alt: "Property View 3",
//   },
//   {
//     src: "/gallery/property4.jpg",
//     alt: "Property View 4",
//   },
//   {
//     src: "/gallery/surroundings1.jpg",
//     alt: "Surroundings View 1",
//   },
//   {
//     src: "/gallery/surroundings2.jpg",
//     alt: "Surroundings View 2",
//   },
//   {
//     src: "/gallery/surroundings3.jpg",
//     alt: "Surroundings View 3",
//   },
//   {
//     src: "/gallery/surroundings4.jpg",
//     alt: "Surroundings View 4",
//   },
// ];

// function Gallery() {

//   return (
//     <React.Fragment>
//       <AppAppBar />
//       <Container maxWidth="lg" sx={{ py: 8 }}>
//         {/* Introduction */}
//         <Box sx={{ textAlign: "center", mb: 8 }}>
//           <Typography variant="h3" gutterBottom>
//             Explore Our Gallery
//           </Typography>
//           <Typography variant="body1" paragraph>
//             Discover the stunning beauty of our property and its surroundings.
//             Each image tells a story of comfort, luxury, and breathtaking
//             landscapes.
//           </Typography>
//         </Box>

//         {/* Gallery Section */}
//         <SectionTitle variant="h4">Our Property</SectionTitle>
//         <Grid container spacing={4}>
//           {galleryImages.map((image, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <ImageContainer>
//                 {/* <img src={image.src} alt={image.alt} /> */}
//                 <img
//                   src={
//                     "https://www.vanorohotel.com/wp-content/uploads/2021/07/drz-vanoro_6737.jpg"
//                   }
//                   alt={image.alt}
//                 />
//               </ImageContainer>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//       <AppFooter />
//     </React.Fragment>
//   );
// }

// export default withRoot(Gallery);

import * as React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import {
  Container,
  Box,
  Grid,
  Typography,
  Dialog,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

// Styled Component for the Image Container
const ImageContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  "& img": {
    width: "100%",
    height: "auto",
    borderRadius: theme.shape.borderRadius,
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: "bold",
  textTransform: "uppercase",
  color: theme.palette.primary.main,
  textAlign: "center",
}));

// Array of images for the gallery
const galleryImages = [
  { src: "/gallery/IMG_0327.JPG", alt: "Property View 1" },
  { src: "/gallery/IMG-20241013-WA0015.jpg", alt: "Property View 1" },
  { src: "/gallery/IMG-20241013-WA0016.jpg", alt: "Property View 1" },
  { src: "/gallery/IMG-20241013-WA0017.jpg", alt: "Property View 1" },
  { src: "/gallery/IMG-20241013-WA0018.jpg", alt: "Property View 1" },
  { src: "/gallery/IMG-20241013-WA0022.jpg", alt: "Property View 1" },
  { src: "/gallery/IMG-20241013-WA0024.jpg", alt: "Property View 1" },
  { src: "/gallery/IMG-20241013-WA0026.jpg", alt: "Property View 1" },
  { src: "/gallery/IMG-20241013-WA0030.jpg", alt: "Property View 1" },
  { src: "/gallery/IMG-20241013-WA0033.jpg", alt: "Property View 1" },
  { src: "/gallery/IMG-20241013-WA0034.jpg", alt: "Property View 1" },
  { src: "/gallery/IMG-20241013-WA0040.jpg", alt: "Property View 1" },
  {
    src: "/gallery/WhatsApp Image 2024-11-04 at 16.53.12_4c7e20c4.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-04 at 17.20.51_59267bfe.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-04 at 17.31.44_70547462.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-04 at 19.45.25_f0795898.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-04 at 19.50.14_9ec58fb4.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-04 at 19.52.50_38e0297c.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-04 at 19.55.05_89bfcdd5.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.18_18c31bca.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.22_64376673.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.27_ed03e58d.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.32_6a60ec53.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.35_c934f32b.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.40_a5433c71.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.43_988fbcd0.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.57_70263001.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.59_845c51d7.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.18.06_ea7f0ba4.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.18.10_f9eff0d2.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.35.23_66d83d13.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.35.48_8be6d0f4.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.35.54_217f049d.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.00_7bc1c8d8.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.01_27de7c60.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.01_f15c8215.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.10_367c78ee.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.32_34aeef4a.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.33_8a38c380.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.34_99bde407.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.35_1f2166d9.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.35.20_9a70988b.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.35.20_a46fdc51.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.35.20_bd027da1.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.35.21_0ec1eeea.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.35.21_95a1ffef.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.35.22_7fe78125.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.46.34_be436fa7.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.46.34_61071ed7.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.46.36_ef76c72d.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.46.36_1b9d01d4.jpg",
    alt: "Property View 1",
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.46.37_f3946a13.jpg",
    alt: "Property View 1",
  },
];
function Gallery() {
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<any>(null);

  const handleClickOpen = (image: any) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Introduction */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" gutterBottom>
            Explore Our Gallery
          </Typography>
          <Typography variant="body1" paragraph>
            Discover the stunning beauty of our property and its surroundings.
            Each image tells a story of comfort, luxury, and breathtaking
            landscapes.
          </Typography>
        </Box>

        {/* Gallery Section */}
        <SectionTitle variant="h4">Our Property</SectionTitle>
        <Grid container spacing={4}>
          {galleryImages.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ImageContainer onClick={() => handleClickOpen(image)}>
                <img src={image.src} alt={image.alt} />
              </ImageContainer>
            </Grid>
          ))}
        </Grid>
      </Container>
      <AppFooter />

      {/* Fullscreen Dialog for Image */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <Box position="relative">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </Box>
      </Dialog>
    </React.Fragment>
  );
}

export default withRoot(Gallery);
