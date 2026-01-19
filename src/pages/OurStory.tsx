import * as React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "./modules/components/Typography";
import { styled } from "@mui/system";

const images = [
  "/images/ourstory/WhatsApp Image 2024-11-15 at 11.42.45_e26825f1.avif",
  "/images/ourstory/IMG-20241013-WA0021.avif",
  "/images/home/IMG_0325-800w.avif",
];

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
}));

function OurStory() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Origins Section */}
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <SectionTitle variant="h4">Origins</SectionTitle>
            <Typography variant="body1" paragraph>
              Deep in the heart of Knuckles mountain range, where nature's
              symphony reigns supreme, our boutique hotel, “The Vintage Villa Knuckles (PVT) LTD”
              has its roots firmly embedded in a unique vision. Founded by Mr.
              Sumith Gunathilaka, an enthusiastic antique hobbyist and a
              passionate preservationist of nature and history, “The Vintage
              Villa Knuckles” was conceived as a sanctuary where the serenity of the
              wilderness harmoniously coexists with the charm of a bygone era.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageContainer>
              <img src={images[0]} alt="Origins of The Vintage Villa" loading="lazy"/>
            </ImageContainer>
          </Grid>
        </Grid>

        {/* Mission Section */}
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <ImageContainer>
              <img src={images[1]} alt="Mission of The Vintage Villa" loading="lazy"/>
            </ImageContainer>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <SectionTitle variant="h4">Mission</SectionTitle>
            <Typography variant="body1" paragraph>
              Our mission at “The Vintage Villa” is a harmonious blend of two
              passions: embracing the wild and cherishing the past. We aspire to
              offer our guests a refuge where they can disconnect from the
              modern world, immerse themselves in the splendor of the mountain
              forest, and experience the genuine, unspoiled beauty of the
              wilderness. We believe that in the stillness of nature, one can
              find the echoes of the past and a profound connection to the soul.
            </Typography>
            <Typography variant="body1" paragraph>
              Through meticulous restoration and a commitment to preserving the
              forest's ecological balance, we have transformed this secluded
              haven into a timeless escape. Our mission is to provide an
              unforgettable retreat that stirs the soul, kindles an intimacy for
              nature, and awakens a sense of wonder for days gone by.
            </Typography>
          </Grid>
        </Grid>

        {/* Values Section */}
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <SectionTitle variant="h4">Our Values</SectionTitle>
            <Typography variant="body1" paragraph>
              At “The Vintage Villa”, we hold our values as dearly as the forest
              that surrounds us:
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Preservation of Nature:</strong> We are guardians of this
              pristine forest, and our dedication to its preservation is
              unwavering. Our hotel operates in harmony with nature, and we
              actively support local conservation efforts to protect the
              delicate ecosystem.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Historical Reverence:</strong> We celebrate the past
              through carefully curated vintage decor, offering guests a glimpse
              into the charm and grace of the olden days of Sri Lanka. Each
              piece of furniture and every detail is selected to evoke nostalgia
              and appreciation for Sri Lankan Narrative.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Sustainable Luxury:</strong> Our commitment to
              sustainability extends to every aspect of our operation. From
              energy-efficient amenities to locally sourced, organic cuisine, we
              prioritize environmentally friendly practices that minimize our
              impact on the forest.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Community Engagement:</strong> We foster connections not
              only among our guests but also with the local communities that
              call this wilderness home. We believe in the importance of giving
              back to the land and people who enrich our lives.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Adventure and Tranquility:</strong> We encourage guests to
              explore the mountain forest's rugged beauty while also providing
              serene spaces for relaxation. Whether hiking through well-worn
              trails or unwinding by the fire, “The Vintage Villa” offers a
              balance between adventure and tranquility.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageContainer>
              <img src={images[2]} alt="Values of The Vintage Villa" loading="lazy"/>
            </ImageContainer>
          </Grid>
        </Grid>

        {/* Closing Statement */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            In the heart of this remote mountain forest, “The Vintage Villa”
            stands as a testament to the merging of wilderness and nostalgia.
          </Typography>
          <Typography variant="body1">
            We invite you to embark on a journey to our haven, where the past
            meets the present, and where the remote embraces the refined at “The
            Vintage Villa”.
          </Typography>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(OurStory);
