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
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";

// Update ImageContainer style to enforce consistent height for all images
const ImageContainer = styled(Box)(({ theme }) => ({
  aspectRatio: "16/10",
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover", // This ensures that the image fills the container without distortion
    objectPosition: "center", // This centers the image
    borderRadius: theme.shape.borderRadius,
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
}));

// Array of images with tags
const galleryImages = [
  { src: "/gallery/IMG_0327.JPG", tags: ["All", "Exterior"] },
  { src: "/gallery/IMG-20241013-WA0015.jpg", tags: ["All", "Interior"] },
  { src: "/gallery/IMG-20241013-WA0016.jpg", tags: ["All", "Garden"] },
  { src: "/gallery/IMG-20241013-WA0017.jpg", tags: ["All", "Interior"] },
  { src: "/gallery/IMG-20241013-WA0018.jpg", tags: ["All", "Exterior"] },
  { src: "/gallery/IMG-20241013-WA0022.jpg", tags: ["All", "Landscape"] },
  { src: "/gallery/IMG-20241013-WA0024.jpg", tags: ["All", "Landscape"] },
  { src: "/gallery/IMG-20241013-WA0026.jpg", tags: ["All", "Exterior"] },
  { src: "/gallery/IMG-20241013-WA0030.jpg", tags: ["All", "Interior"] },
  { src: "/gallery/IMG-20241013-WA0033.jpg", tags: ["All", "Garden"] },
  { src: "/gallery/IMG-20241013-WA0034.jpg", tags: ["All", "Interior"] },
  { src: "/gallery/IMG-20241013-WA0040.jpg", tags: ["All", "Exterior"] },
  {
    src: "/gallery/WhatsApp Image 2024-11-04 at 16.53.12_4c7e20c4.jpg",
    tags: ["All", "Landscape"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-04 at 17.20.51_59267bfe.jpg",
    tags: ["All", "Interior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-04 at 17.31.44_70547462.jpg",
    tags: ["All", "Garden"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-04 at 19.45.25_f0795898.jpg",
    tags: ["All", "Exterior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-04 at 19.50.14_9ec58fb4.jpg",
    tags: ["All", "Landscape"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-04 at 19.52.50_38e0297c.jpg",
    tags: ["All", "Garden"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-04 at 19.55.05_89bfcdd5.jpg",
    tags: ["All", "Interior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.18_18c31bca.jpg",
    tags: ["All", "Landscape"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.22_64376673.jpg",
    tags: ["All", "Garden"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.27_ed03e58d.jpg",
    tags: ["All", "Interior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.32_6a60ec53.jpg",
    tags: ["All", "Exterior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.35_c934f32b.jpg",
    tags: ["All", "Landscape"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.40_a5433c71.jpg",
    tags: ["All", "Interior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.43_988fbcd0.jpg",
    tags: ["All", "Exterior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.57_70263001.jpg",
    tags: ["All", "Garden"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.17.59_845c51d7.jpg",
    tags: ["All", "Interior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.18.06_ea7f0ba4.jpg",
    tags: ["All", "Landscape"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.18.10_f9eff0d2.jpg",
    tags: ["All", "Garden"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.35.23_66d83d13.jpg",
    tags: ["All", "Exterior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.35.48_8be6d0f4.jpg",
    tags: ["All", "Interior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.35.54_217f049d.jpg",
    tags: ["All", "Landscape"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.00_7bc1c8d8.jpg",
    tags: ["All", "Garden"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.01_27de7c60.jpg",
    tags: ["All", "Exterior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.01_f15c8215.jpg",
    tags: ["All", "Interior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.10_367c78ee.jpg",
    tags: ["All", "Landscape"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.32_34aeef4a.jpg",
    tags: ["All", "Garden"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.33_8a38c380.jpg",
    tags: ["All", "Interior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.34_99bde407.jpg",
    tags: ["All", "Exterior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 15.36.35_1f2166d9.jpg",
    tags: ["All", "Landscape"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.35.20_9a70988b.jpg",
    tags: ["All", "Garden"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.35.20_a46fdc51.jpg",
    tags: ["All", "Exterior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.35.20_bd027da1.jpg",
    tags: ["All", "Interior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.35.21_0ec1eeea.jpg",
    tags: ["All", "Landscape"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.35.21_95a1ffef.jpg",
    tags: ["All", "Garden"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.35.22_7fe78125.jpg",
    tags: ["All", "Exterior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.46.34_be436fa7.jpg",
    tags: ["All", "Interior"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.46.34_61071ed7.jpg",
    tags: ["All", "Landscape"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.46.36_ef76c72d.jpg",
    tags: ["All", "Garden"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.46.36_1b9d01d4.jpg",
    tags: ["All", "Garden"],
  },
  {
    src: "/gallery/WhatsApp Image 2024-11-15 at 20.46.37_f3946a13.jpg",
    tags: ["All", "Garden"],
  },
];

// Tags list
const tagsList = ["All", "Exterior", "Interior", "Garden", "Landscape"];

function Gallery() {
  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [selectedTag, setSelectedTag] = React.useState(
    query.get("tag") || "All"
  );

  const handleClickOpen = (image: any) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const filteredImages =
    selectedTag === "All"
      ? galleryImages
      : galleryImages.filter((image) => image.tags.includes(selectedTag));

  return (
    <React.Fragment>
      <AppAppBar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" gutterBottom>
            Explore Our Gallery
          </Typography>
          <Typography variant="body1" paragraph>
            Discover the stunning beauty of our property and its surroundings.
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          {tagsList.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "contained" : "outlined"}
              onClick={() => handleTagClick(tag)}
              sx={{
                mx: 1,
                my: 1, // Added vertical margin between tags
              }}
            >
              {tag}
            </Button>
          ))}
        </Box>
        <Typography variant="h6" sx={{ textAlign: "center", mb: 4 }}>
          {filteredImages.length} Images Showing
        </Typography>
        {/* Update Grid to use a more flexible layout (CSS grid style) */}
        <Grid
          container
          spacing={4}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Default for larger screens
            // Mobile-specific adjustments (2 columns)
            "@media (max-width: 600px)": {
              gridTemplateColumns: "repeat(2, 1fr)", // 2 columns on small screens
            },
          }}
        >
          {filteredImages.map((image, index) => {
            const altText = image.src.split("/").pop();
            return (
              <Grid item key={index}>
                <ImageContainer onClick={() => handleClickOpen(image)}>
                  <img src={image.src} alt={altText} />
                </ImageContainer>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
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
          <Box
            component="img"
            src={selectedImage.src}
            alt={selectedImage.src.split("/").pop()}
            sx={{ width: "100%" }}
          />
        )}
      </Dialog>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Gallery);








