import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import { Grid, Button } from "@mui/material"; // Import Button from MUI
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import { Link as RouterLink } from "react-router-dom";

const images = [
  {
    src: "/home/IMG_0337.JPG",
    text: "Each of our luxury rooms at the vintage-themed villa is a masterpiece of design, offering an immersive journey into a bygone era while pampering you with modern comforts.",
  },
  {
    src: "/home/IMG_0346.JPG",
    text: "Antique furnishings and period-inspired decor transport you to a time of refined elegance. Our vintage rooms are a symphony of muted hues, ornate accents, and soft lighting, creating an ambiance of intimate grandeur.",
  },
  {
    src: "/home/IMG_0348.JPG",
    text: "Whether you choose a room with a forest view or a private balcony overlooking the mountains, each luxury space offers a tranquil escape. Allow the gentle rustling of leaves and the scent of fresh mountain air to lull you into a peaceful slumber.",
  },
];

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.5)",
  opacity: 0,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  height: 300, // Default height for larger screens
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    height: 150, // Half height for mobile view
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 1,
  },
  "&:hover .imageTitle": {
    opacity: 1,
  },
}));

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        overflow: "hidden",
        bgcolor: "secondary.light",
      }}
    >
      <Container
        sx={{
          mt: 15,
          mb: 30,
          display: "flex",
          position: "relative",
          flexDirection: "column",
        }}
        style={{
          maxWidth: "none",
        }}
      >
        <Box
          sx={{
            textAlign: { xs: "center", sm: "left" }, // Center on mobile
          }}
        >
          <Typography
            variant="h6"
            sx={{ my: 5, fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }} // Increased font size
          >
            Unwind in vintage-inspired luxury
          </Typography>
        </Box>
        <Box
          component="img"
          src="/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            zIndex: 0,
          }}
        />
        <Grid container spacing={{ xs: 0, sm: 2 }}>
          {" "}
          {/* Add space only in desktop */}
          {images.map((image) => (
            <Grid item xs={12} sm={4} key={image.src}>
              <ImageIconButton>
                <Box
                  component="img"
                  src={image.src}
                  alt={image.text}
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
                <ImageBackdrop className="imageBackdrop" />
                <Typography
                  component="h3"
                  variant="h6"
                  color="common.white"
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    textAlign: "center",
                    padding: 2,
                    fontSize: { xs: "0.75rem", sm: "1rem" }, // Smaller font on mobile
                    opacity: 0, // Initially hidden
                    transition: "opacity 0.3s", // Smooth transition
                  }}
                  className="imageTitle"
                >
                  {image.text}
                </Typography>
              </ImageIconButton>
            </Grid>
          ))}
        </Grid>

        {/* "Visit the Gallery" Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}
        >
          {/* <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              fontSize: "1rem",
              paddingX: 4,
              paddingY: 1.5,
            }}
          >
            Visit the Gallery
          </Button> */}
          <Button
            color="secondary"
            variant="contained"
            size="large"
            component={RouterLink}
            to="/gallery/"
            sx={{ minWidth: 200 }}
          >
            Visit the Gallery
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ProductValues;
