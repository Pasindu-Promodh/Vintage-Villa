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
      <Link 
        color="inherit" 
        href="https://www.vintagevilla.lk" 
        target="_blank" 
        rel="noopener noreferrer"
      >
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
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <RouterLink to="/">
                <img
                  src={"/logo.png"}
                  alt="Vintage Villa Logo"
                  style={{ height: 180, width: 180, backgroundColor: "#28282a" }}
                  loading="lazy"
                />
              </RouterLink>
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
              {[
                { 
                  href: "https://www.facebook.com/", 
                  src: "https://img.icons8.com/?size=48&id=85024&format=png&color=28282a", 
                  alt: "Facebook" 
                },
                { 
                  href: "https://www.instagram.com/", 
                  src: "https://img.icons8.com/?size=48&id=85154&format=png&color=28282a", 
                  alt: "Instagram" 
                },
                { 
                  href: "https://www.tiktok.com/", 
                  src: "https://img.icons8.com/?size=48&id=soupkpLfTkZi&format=png&color=28282a", 
                  alt: "TikTok" 
                }
              ].map((social) => (
                <Link 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{
                    ...iconStyle,
                    display: 'inline-flex',
                    mr: 1
                  }}
                  key={social.alt}
                >
                  <img 
                    src={social.src} 
                    alt={social.alt} 
                    style={{ width: 48, height: 48 }}
                    loading="lazy"
                  />
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Navigation Section */}
          <Grid item xs={12} sm={3} md={3}>
            <Typography variant="h6" marked="left" gutterBottom>
              Navigation
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              {[
                { name: "Home", path: "/" },
                { name: "Our Story", path: "/our-story/" },
                { name: "Things to Do", path: "/things-todo/" },
                { name: "Sri Lankan Cuisine", path: "/srilankan-cuisine/" },
                { name: "Reservations", path: "/reservations/" },
                { name: "Gallery", path: "/gallery/" },
                { name: "Contact Us", path: "/contact/" },
                { name: "FAQ", path: "/faq/" }
              ].map((item) => (
                <Box component="li" sx={{ py: 0.5 }} key={item.name}>
                  <Link component={RouterLink} to={item.path}>
                    {item.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Legal Section */}
          <Grid item xs={12} sm={3} md={3}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              {[
                { name: "Privacy Policy", path: "/privacy-policy/" },
                { name: "Terms of Use", path: "/terms-of-use/" },
                { name: "Cancellation and Refund Policy", path: "/refund-policy/" }
              ].map((item) => (
                <Box component="li" sx={{ py: 0.5 }} key={item.name}>
                  <Link component={RouterLink} to={item.path}>
                    {item.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}