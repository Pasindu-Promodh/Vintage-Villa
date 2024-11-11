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
  {
    src: "/home/IMG_0325.JPG",
    alt: "Property View 1",
  },
  {
    src: "/home/IMG_0325.JPG",
    alt: "Property View 2",
  },
  {
    src: "/home/IMG_0325.JPG",
    alt: "Property View 3",
  },
  {
    src: "/home/IMG_0325.JPG",
    alt: "Property View 4",
  },
  {
    src: "/home/IMG_0325.JPG",
    alt: "Surroundings View 1",
  },
  {
    src: "/home/IMG_0325.JPG",
    alt: "Surroundings View 2",
  },
  {
    src: "/home/IMG_0325.JPG",
    alt: "Surroundings View 3",
  },
  {
    src: "/home/IMG_0325.JPG",
    alt: "Surroundings View 4",
  },
];

function Gallery() {
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<any>(null);

  const handleClickOpen = (image:any) => {
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
