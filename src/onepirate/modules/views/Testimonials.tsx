import * as React from "react";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
  textAlign: "center",
};

function Testimonials() {
  const testimonials = [
    {
      name: "Ryan Reynolds",
      quote:
        "A truly breathtaking experience! The scenic views at Knuckles Mountain Range were beyond anything I imagined. Highly recommend the guided tours.",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      name: "Hugh Jackman",
      quote:
        "The staff were incredibly friendly, and the accommodations were comfortable. I loved waking up to the misty mornings and fresh mountain air!",
      image:
        "https://m.media-amazon.com/images/M/MV5BNDExMzIzNjk3Nl5BMl5BanBnXkFtZTcwOTE4NDU5OA@@._V1_.jpg",
    },
    {
      name: "Ryan Gosling",
      quote:
        "Perfect getaway from the city! We enjoyed hiking and exploring hidden waterfalls. Can't wait to return next year!",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_.jpg",
    },
  ];

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
        <Typography
          variant="h4"
          marked="center"
          align="center"
          component="h2"
          sx={{ mb: 14 }}
        >
          What Our Guests Say
        </Typography>
        <div>
          <Grid container spacing={5}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={item}>
                  {/* Using background image as a fallback for image loading */}
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      mb: 4,
                      backgroundImage: `url(${testimonial.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
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
        </div>
      </Container>
    </Box>
  );
}

export default Testimonials;
