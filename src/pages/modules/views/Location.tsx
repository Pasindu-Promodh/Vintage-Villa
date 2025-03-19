import * as React from "react";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "../components/Button";
import Typography from "../components/Typography";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import RouteIcon from "@mui/icons-material/Route";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium",
};

// const iconBox = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   height: 80,
//   width: 80,
//   borderRadius: "50%",
//   backgroundColor: "secondary.light",
//   my: 4,
// };

function Location() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "background.paper", overflow: "hidden" }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          Getting Here
        </Typography>
        <div>
          <Grid container spacing={5}>
            {/* Step 1 */}
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                {/* <Box sx={iconBox}>
                  <DirectionsCarIcon
                    sx={{ fontSize: 40, color: "secondary.dark" }}
                  />
                </Box> */}
                <Typography variant="h5" align="center">
                  Kandy to Theldeniya (20 km) via the Kandy-Mahiyangana road.
                </Typography>
              </Box>
            </Grid>
            {/* Step 2 */}
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                {/* <Box sx={iconBox}>
                  <RouteIcon sx={{ fontSize: 40, color: "secondary.dark" }} />
                </Box> */}
                <Typography variant="h5" align="center">
                  Theldeniya to Thangappuwa via Rangala town (20 km).
                </Typography>
              </Box>
            </Grid>
            {/* Step 3 */}
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                {/* <Box sx={iconBox}>
                  <LocationOnIcon
                    sx={{ fontSize: 40, color: "secondary.dark" }}
                  />
                </Box> */}
                <Typography variant="h5" align="center">
                  Thangappuwa to Aanamale road (1.5 km).
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        {/* Google Map Embed */}
        <Box
          sx={{
            width: "100%",
            height: "400px",
            mt: 8,
            mb: 4,
          }}
        >
          <iframe
            title="Google Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.040095634347!2d80.81771447571603!3d7.34939451301371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4a1c18fbb805f%3A0x6e2b430eceb4c37f!2sThe%20Vintage%20Villa!5e0!3m2!1sen!2slk!4v1730012870644!5m2!1sen!2slk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </Box>
        {/* Get Directions Link */}
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=The+Vintage+Villa,+Thangappuwa+Road,+Rangala"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Button
            color="secondary"
            size="large"
            variant="contained"
            sx={{ mt: 8 }}
          >
            Get Directions
          </Button>
        </a>
      </Container>
    </Box>
  );
}

export default Location;
