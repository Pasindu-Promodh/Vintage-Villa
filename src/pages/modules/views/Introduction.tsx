import * as React from "react";
import Button from "../components/Button";
import Typography from "../components/Typography";
import IntroductionLayout from "./IntroductionLayout";
import { Link as RouterLink } from "react-router-dom";

const backgroundImage = "/images/home/IMG_0327.JPG";

export default function Introduction() {
  return (
    <IntroductionLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography
        color="inherit"
        align="center"
        variant="h2"
        marked="center"
        sx={{ fontFamily: "'Metal', serif" }}
      >
        THE VINTAGE VILLA KNUCKLES
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Vintage Luxury in the Heart of Nature <br />
        <br />
        Step back in time to a bygone era of elegance and charm. Embrace the
        vintage allure of our villa amidst the breathtaking Knuckles Mountain
        Range.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component={RouterLink}
        to="/reservations/"
        sx={{ minWidth: 200 }}
      >
        Reserve now
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </IntroductionLayout>
  );
}
