import * as React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "./modules/components/Typography";
import { styled } from "@mui/system";

// Styled Components for visual enhancement
const ImageContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  "& img": {
    width: "100%",
    borderRadius: theme.shape.borderRadius,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: "bold",
  textTransform: "uppercase",
  color: theme.palette.primary.main,
}));

// Array to hold the section data
const thingsToDoContent = [
  {
    title: "Hiking Trails and Waterfalls",
    description:
      "Embark on unforgettable journeys through the lush hiking trails of the Knuckles Mountain Range. Our hotel provides easy access to some of the most scenic and well-preserved paths, taking you through ancient forests, tea plantations, and captivating landscapes. Along the way, be sure to discover the hidden gems of this region, including breathtaking waterfalls that cascade down from the misty heights.",
    image:
      "https://i.natgeofe.com/n/7afda449-1780-4938-8342-2abe32326c86/Montblanchike.jpg",
    alt: "Hiking Trails and Waterfalls",
    imageOrder: 1,
  },
  {
    title: "Meemure Village",
    description:
      "Immerse yourself in the culture and traditions of Sri Lanka by visiting the nearby Meemure Village. This picturesque rural hamlet, nestled amidst the mountains, offers a glimpse into the lives of its welcoming residents. Explore the village's rich history, try your hand at traditional crafts, and savor authentic Sri Lankan cuisine prepared by local families.",
    image: "https://duqjpivknq39s.cloudfront.net/2018/12/meemure.jpg",
    alt: "Meemure Village",
    imageOrder: 2,
  },
  {
    title: "Kandy",
    description:
      "Just a short drive away, the historic city of Kandy awaits your exploration. Known for its UNESCO-listed Temple of the Tooth and vibrant cultural scene, Kandy offers a fascinating blend of history, spirituality, and art. Stroll around the scenic Kandy Lake, visit the Royal Botanical Gardens, and be captivated by the city's unique atmosphere.",
    image:
      "https://deih43ym53wif.cloudfront.net/temple-tooth-kandy-sri-lanka-shutterstock_1037797372_24beb3388c.jpeg",
    alt: "Kandy City",
    imageOrder: 1,
  },
  {
    title: "Mini World's End",
    description:
      "Experience the awe-inspiring vistas of 'Mini World's End,' a remarkable viewpoint in the Knuckles Mountain Range. Here, you'll be rewarded with panoramic views of the surrounding mountains, valleys, and lush greenery, making it an ideal spot for photographers and nature enthusiasts.",
    image: "https://duqjpivknq39s.cloudfront.net/2018/12/mini-worlds-end.jpg",
    alt: "Mini World's End",
    imageOrder: 2,
  },
];

function ThingsToDo() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Introduction */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" gutterBottom>
            Discover the Charms of the Knuckles Mountain Range
          </Typography>
          <Typography variant="body1" paragraph>
            Your Vintage Adventure Awaits!
          </Typography>
          <Typography variant="body1">
            Nestled in the heart of the pristine Knuckles Mountain Range in Sri
            Lanka, our vintage-themed boutique hotel offers not only a tranquil
            retreat but also a gateway to a world of enchanting experiences.
            Explore the timeless allure of this unique region through a variety
            of activities that cater to nature enthusiasts, culture seekers, and
            adventure lovers alike.
          </Typography>
        </Box>

        {/* Render the sections dynamically from the array */}
        {thingsToDoContent.map((section, index) => (
          <Grid
            container
            spacing={6}
            alignItems="center"
            key={index}
            sx={{ mb: 8 }}
          >
            <Grid item xs={12} md={6} order={{ xs: section.imageOrder, md: 1 }}>
              <ImageContainer>
                <img src={section.image} alt={section.alt} />
              </ImageContainer>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: section.imageOrder }}>
              <SectionTitle variant="h4">{section.title}</SectionTitle>
              <Typography variant="body1" paragraph>
                {section.description}
              </Typography>
            </Grid>
          </Grid>
        ))}

        {/* Closing Statement */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            At our vintage-themed boutique hotel, we believe in offering more
            than just a place to stay – we provide a gateway to unforgettable
            experiences.
          </Typography>
          <Typography variant="body1">
            Whether you seek the thrill of hiking, the serenity of waterfalls,
            the charm of local villages, or the cultural richness of nearby
            cities, our 'Things to Do' page will guide you through a world of
            possibilities. Join us on a journey through the timeless wonders of
            the Knuckles Mountain Range and its surrounding treasures. Your
            vintage adventure begins here.
          </Typography>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(ThingsToDo);
