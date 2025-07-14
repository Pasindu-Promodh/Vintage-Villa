import * as React from "react";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Typography from "../components/Typography";
import IntroductionLayout from "./IntroductionLayout";
import { Link as RouterLink } from "react-router-dom";

const backgroundImages = [
  "/images/home/IMG_0325.webp",
  "/images/home/SlideShow/IMG-20241013-WA0016.webp",
  "/images/home/SlideShow/IMG-20241013-WA0022.webp",
  "/images/home/SlideShow/IMG-20241013-WA0040.webp",
  "/images/home/SlideShow/WhatsApp10_f9eff0d2.webp",
];

export default function Introduction() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Image slideshow timer
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <IntroductionLayout
      sxBackground={{
        backgroundColor: "#7fc7d9", // Average color of the background image
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Background image slideshow container */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      >
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: activeIndex === index ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
            }}
          />
        ))}

        {/* Semi-transparent overlay for text contrast */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        />
      </div>

      {/* Increase the network loading priority of the background image */}
      <img
        style={{ display: "none" }}
        src={backgroundImages[0]}
        alt="increase priority"
        loading="lazy"
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
