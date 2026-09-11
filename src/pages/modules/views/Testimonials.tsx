import * as React from "react";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "../components/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
  textAlign: "center",
};

function Testimonials() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const testimonials = [
    {
      name: "Meghan Fitz-James",
      quote:
        "Staying at Vintage Villa in the Knuckles Mountains was a memorable experience. The peaceful atmosphere, with birds singing and mist over the valley, made it a perfect retreat. Sumith, the host, provided personalized service, organizing hikes and local trips. The off-grid, solar-powered guesthouse offered stunning views, crystal-clear river pools, and a delicious Sri Lankan breakfast on the balcony. It was a tranquil haven for relaxation and creativity. Highly recommended – 5 out of 5.",
      image: "/images/reviews/meghan.webp",
    },
    {
      name: "Virgile Vandewalle",
      quote:
        "We had a wonderful time in the knuckles thanks to Sumith. The place is magical, Sumith prepares excellent food and the room has an incredible view. Everything was perfect, thank you Sumith!",
      image: "/images/reviews/virgile_vandewalle.webp",
    },
    {
      name: "Marta Molins",
      quote:
        "The accommodation is in the heart of the Knuckles, the location cannot convey more peace and relaxation. The facilities are tastefully designed and have everything you need. Sumith, the owner of the accommodation is in charge of having everything ready for your arrival, he can also organise routes with the best guides in the region, as was our case, and he will offer you the best typical Sri Lankan food you can taste. No doubt a place to come back and recommend.",
      image: "/images/reviews/martha.webp",
    },
  ];

  const googleReviewsUrl = "https://www.google.com/maps/place/The+Vintage+Villa+Knuckles/@7.3493892,80.8202894,1087m/data=!3m1!1e3!4m24!1m12!3m11!1s0x3ae4a1c18fbb805f:0x6e2b430eceb4c37f!2sThe+Vintage+Villa+Knuckles!5m2!4m1!1i2!8m2!3d7.3493892!4d80.8202894!9m1!1b1!16s%2Fg%2F11vc2_6ksq!3m10!1s0x3ae4a1c18fbb805f:0x6e2b430eceb4c37f!5m2!4m1!1i2!8m2!3d7.3493892!4d80.8202894!9m1!1b1!16s%2Fg%2F11vc2_6ksq?entry=ttu&g_ep=EgoyMDI2MDkwOC4wIKXMDSoASAFQAw%3D%3D";
  const tripAdvisorUrl = "https://www.tripadvisor.com/Hotel_Review-g17782726-d27123668-Reviews-The_Vintage_Villa_Knuckles-Thangappuwa_Kandy_District_Central_Province.html";

  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "secondary.light", overflow: "hidden" }}
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
        <Typography
          variant="h4"
          marked="center"
          align="center"
          component="h2"
          sx={{ mb: 14 }}
        >
          What Our Guests Say
        </Typography>
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
        <Grid container spacing={5}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={item}>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    mb: 4,
                    backgroundImage: `url(${testimonial.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 1,
                  }}
                />
                <Typography variant="h6" component="p" sx={{ mb: 2 }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  "{testimonial.quote}"
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Review Buttons Container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            gap: isMobile ? 2 : 3,
            mt: 5,
            width: isMobile ? "100%" : "auto",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth={isMobile}
            sx={{
              px: isMobile ? 2 : 4,
              py: 1.5,
              fontSize: isMobile ? "0.9rem" : "1rem",
              textTransform: "none",
              minWidth: isMobile ? "auto" : 200,
            }}
          >
            Read Our Google Reviews
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            href={tripAdvisorUrl}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth={isMobile}
            sx={{
              px: isMobile ? 2 : 4,
              py: 1.5,
              fontSize: isMobile ? "0.9rem" : "1rem",
              textTransform: "none",
              minWidth: isMobile ? "auto" : 200,
            }}
          >
            See TripAdvisor Reviews
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Testimonials;