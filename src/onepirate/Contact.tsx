import * as React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
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

const ContactFormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
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
          <Typography variant="body1">Email: info@vintagevilla.com</Typography>
          <Typography variant="body1">Phone: +94 77 302 0635</Typography>
          <Typography variant="body1">
            Address: Vintage Villa, Thangappuwa Rd, Rangala, Sri Lanka
          </Typography>
          <Typography variant="body1">Follow us on Social Media:</Typography>
          <Typography variant="body1">
            Facebook | Instagram | Twitter
          </Typography>
        </ContactDetailsContainer>

        {/* Contact Form */}
        <ContactFormContainer>
          <Typography variant="h6">Send Us a Message</Typography>
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Your Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Send Message
          </Button>
        </ContactFormContainer>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(ContactUs);
