import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import { Link as RouterLink } from "react-router-dom";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      sx={{ mt: 2 }}
    >
      {"© "}
      <Link color="inherit" href="www.vintagevilla.lk">
        vintage villa
      </Link>
      {" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "warning.main",
  mr: 1,
  "&:hover": {
    bgcolor: "warning.dark",
  },
};

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: "flex", bgcolor: "secondary.light", py: 5 }}
    >
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid container spacing={5} alignItems="flex-start">
          {/* Logo Section */}
          <Grid item xs={12} sm={3} md={3}>
            <Box
              component="a"
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={"/logo.png"}
                alt="Vintage Villa Logo"
                style={{ height: 200, backgroundColor: "#28282a" }}
              />
              {/* Copyright below the logo */}
              <Copyright />
            </Box>
          </Grid>

          {/* Social Media Icons Section */}
          <Grid item xs={12} sm={3} md={3}>
            <Typography variant="h6" marked="left" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", mt: 2 }}>
              <Box
                component="a"
                href="https://www.facebook.com/"
                sx={iconStyle}
              >
                <img
                  src="https://img.icons8.com/?size=48&id=85024&format=png&color=28282a"
                  alt="Facebook"
                />
              </Box>
              <Box
                component="a"
                href="https://www.instagram.com/"
                sx={iconStyle}
              >
                <img
                  src="https://img.icons8.com/?size=48&id=85154&format=png&color=28282a"
                  alt="Instagram"
                />
              </Box>
              <Box component="a" href="https://www.tiktok.com/" sx={iconStyle}>
                <img
                  src="https://img.icons8.com/?size=48&id=soupkpLfTkZi&format=png&color=28282a"
                  alt="TikTok"
                />
              </Box>
              {/* <Box component="a" href="https://twitter.com/" sx={iconStyle}>
                <img src="/appFooterTwitter.png" alt="Twitter" />
              </Box> */}
            </Box>
          </Grid>

          {/* Navigation Section */}
          <Grid item xs={12} sm={3} md={3}>
            <Typography variant="h6" marked="left" gutterBottom>
              Navigation
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link component={RouterLink} to="/">
                  Home
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link component={RouterLink} to="/our-story/">
                  Our Story
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link component={RouterLink} to="/things-todo/">
                  Things to Do
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link component={RouterLink} to="/srilankan-cuisine/">
                  Sri Lankan Cuisine
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link component={RouterLink} to="/reservations/">
                  Reservations
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link component={RouterLink} to="/gallery/">
                  Gallery
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link component={RouterLink} to="/contact/">
                  Contact Us
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link component={RouterLink} to="/faq/">
                  FAQ
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Legal Section */}
          <Grid item xs={12} sm={3} md={3}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link component={RouterLink} to="/privacy-policy/">
                  Privacy Policy
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link component={RouterLink} to="/terms-of-use/">
                  Terms of Use
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link component={RouterLink} to="/refund-policy/">
                  Cancellation and Refund Policy
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Icon Attribution */}
          {/* <Grid item xs={12} sx={{ mt: 4 }}>
            <Typography variant="caption">
              {"Icons made by "}
              <Link
                href="https://www.freepik.com"
                rel="sponsored"
                title="Freepik"
              >
                Freepik
              </Link>
              {" from "}
              <Link
                href="https://www.flaticon.com"
                rel="sponsored"
                title="Flaticon"
              >
                www.flaticon.com
              </Link>
              {" is licensed by "}
              <Link
                href="https://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC 3.0 BY
              </Link>
            </Typography>
          </Grid> */}
        </Grid>
      </Container>
    </Typography>
  );
}
