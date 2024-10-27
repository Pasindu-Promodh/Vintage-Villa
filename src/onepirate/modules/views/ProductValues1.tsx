import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import { Grid } from "@mui/material"; // Import Button from MUI
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

import img1 from "../../../assets/food-2424541.jpg";
import img2 from "../../../assets/food-6884523.jpg";
import img3 from "../../../assets/tea-1770423.jpg";

const images = [
  {
    src: img1,
  },
  {
    src: img2,
  },
  {
    src: img3,
  },
];



const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  height: 300, // Default height for larger screens
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    height: 150, // Half height for mobile view
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
            Taste the Essence of Sri Lanka: Culinary Wonders Await!
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
          {images.map((image) => (
            <Grid item xs={12} sm={4} key={image.src}>
              <Link
                to="/srilankan-cuisine"
                key={image.src}
                component={RouterLink}
                style={{ textDecoration: "none" }}
              >
                <ImageIconButton>
                  <Box
                    component="img"
                    src={image.src}
                    alt={image.src}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </ImageIconButton>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
