import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import { Link as RouterLink } from "react-router-dom";

function ProductSmokingHero() {
  return (
    <Container
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 9,
      }}
    >
      <Box
        sx={{
          border: "4px solid currentColor",
          borderRadius: 0,
          height: "auto",
          py: 2,
          px: 5,
        }}
      >
        <Typography variant="h4" component="span">
          Vintage Hospitality Begins with You
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component={RouterLink}
          to="/contact/"
          sx={{ minWidth: 200 }}
        >
          Contact Us
        </Button>
      </Box>
    </Container>
  );
}

export default ProductSmokingHero;
