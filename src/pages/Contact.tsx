import * as React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import { Container, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styled Components for visual enhancement
const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: "bold",
  textTransform: "uppercase",
  color: theme.palette.primary.main,
  textAlign: "center",
}));

const ContactDetailsContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  textAlign: "center",
}));

function ContactUs() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Contact Section */}
        <SectionTitle variant="h4">
          Get in Contact with Our Vintage Villa Team
        </SectionTitle>

        {/* Contact Details */}
        <ContactDetailsContainer>
          <Typography variant="h6">Contact Details</Typography>
          <Typography variant="body1">Email: info@vintagevilla.lk</Typography>
          <Typography variant="body1">
            Phone: +94 77 401 0635 / +94 77 302 0635
          </Typography>
          <Typography variant="body1">Whatsapp: +94 77 401 0635</Typography>
          <Typography variant="body1">
            Address: The Vintage Villa Knuckles, Thangappuwa, Rangala, Sri Lanka
          </Typography>
          <Typography variant="body1">Follow us on Social Media:</Typography>
          <Typography variant="body1">
            Facebook | Instagram | Twitter
          </Typography>
        </ContactDetailsContainer>

      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(ContactUs);
