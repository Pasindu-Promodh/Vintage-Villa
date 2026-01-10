// import * as React from "react";
// import { useState, useEffect } from "react";
// import Button from "../components/Button";
// import Typography from "../components/Typography";
// import IntroductionLayout from "./IntroductionLayout";
// import { Link as RouterLink } from "react-router-dom";

// const backgroundImages = [
//   "/images/home/IMG_0325.webp", // LCP candidate
//   "/images/home/SlideShow/IMG-20241013-WA0016.webp",
//   "/images/home/SlideShow/IMG-20241013-WA0022.webp",
//   "/images/home/SlideShow/IMG-20241013-WA0040.webp",
//   "/images/home/SlideShow/WhatsApp10_f9eff0d2.webp",
// ];

// export default function Introduction() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setActiveIndex((current) => (current + 1) % backgroundImages.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <IntroductionLayout
//       sxBackground={{
//         backgroundColor: "#7fc7d9",
//         backgroundPosition: "center",
//         position: "relative",
//       }}
//     >
//       {/* Render first image as actual <img> for better LCP */}
//       <img
//         src={backgroundImages[0]}
//         alt="Vintage Villa Knuckles"
//         loading="eager"
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           zIndex: -3,
//         }}
//         // TypeScript workaround for fetchpriority
//         {...({ fetchpriority: "high" } as any)}
//       />

//       {/* Slideshow layer */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           zIndex: -2,
//         }}
//       >
//         {backgroundImages.map((image, index) => (
//           <div
//             key={image}
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               backgroundImage: `url(${image})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               opacity: activeIndex === index ? 1 : 0,
//               transition: "opacity 1.5s ease-in-out",
//             }}
//             aria-hidden={activeIndex !== index}
//           />
//         ))}

//         {/* Semi-transparent overlay */}
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.3)",
//           }}
//         />
//       </div>

//       {/* Text content */}
//       <Typography
//         color="inherit"
//         align="center"
//         variant="h2"
//         marked="center"
//         sx={{ fontFamily: "'Metal', serif" }}
//       >
//         THE VINTAGE VILLA KNUCKLES
//       </Typography>
//       <Typography
//         color="inherit"
//         align="center"
//         variant="h5"
//         sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
//       >
//         Vintage Luxury in the Heart of Nature <br />
//         <br />
//         Step back in time to a bygone era of elegance and charm. Embrace the
//         vintage allure of our villa amidst the breathtaking Knuckles Mountain
//         Range.
//       </Typography>
//       <Button
//         color="secondary"
//         variant="contained"
//         size="large"
//         component={RouterLink}
//         to="/reservations/"
//         sx={{ minWidth: 200 }}
//       >
//         Reserve now
//       </Button>
//       <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
//         Discover the experience
//       </Typography>
//     </IntroductionLayout>
//   );
// }



// import * as React from "react";
// import { useState, useEffect } from "react";
// import Button from "../components/Button";
// import Typography from "../components/Typography";
// import IntroductionLayout from "./IntroductionLayout";
// import { Link as RouterLink } from "react-router-dom";

// const backgroundImages = [
//   "/images/home/IMG_0325.avif", // LCP candidate
//   "/images/home/SlideShow/IMG-20241013-WA0016.avif",
//   "/images/home/SlideShow/IMG-20241013-WA0022.avif",
//   "/images/home/SlideShow/IMG-20241013-WA0040.avif",
//   "/images/home/SlideShow/WhatsApp10_f9eff0d2.avif",
// ];

// export default function Introduction() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setActiveIndex((current) => (current + 1) % backgroundImages.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <IntroductionLayout
//       sxBackground={{
//         backgroundColor: "#7fc7d9",
//         backgroundPosition: "center",
//         position: "relative",
//       }}
      
//     >
//       {/* LCP image (correct) */}
//       <img
//         src={backgroundImages[0]}
//         alt="Luxury eco kabana in the Knuckles Mountains at Vintage Villa"
//         loading="eager"
//         style={{
//           position: "absolute",
//           inset: 0,
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           zIndex: -3,
//         }}
//         {...({ fetchpriority: "high" } as any)}
//       />

//       {/* Slideshow */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           zIndex: -2,
//         }}
//       >
//         {backgroundImages.map((image, index) => (
//           <div
//             key={image}
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundImage: `url(${image})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               opacity: activeIndex === index ? 1 : 0,
//               transition: "opacity 1.5s ease-in-out",
//             }}
//             aria-hidden={activeIndex !== index}
//           />
//         ))}

//         {/* Overlay */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.3)",
//           }}
//         />
//       </div>

//       {/* SEO CRITICAL CONTENT */}

//       {/* H1 — must be unique and descriptive */}
//       <Typography
//         component="h1"
//         // variant="h2"
//         // color="inherit"
//         align="center"
//         sx={{
//           fontFamily: "'Metal', serif",
//           fontSize: { xs: "2rem", sm: "3rem" },
//           fontWeight: 400,
//           mb: 2,
//         }}
//       >
//         Luxury Eco Kabana in the Knuckles Mountains
//       </Typography>

//       {/* Supporting copy */}
//       <Typography
//         component="p"
//         align="center"
//         sx={{ mb: 4, maxWidth: 720, mx: "auto" }}
//       >
//         Vintage Villa is a secluded eco-friendly retreat near the Knuckles
//         Mountain Range in Sri Lanka, offering breathtaking views, trekking
//         access, organic cuisine, and complete privacy in nature.
//       </Typography>

//       {/* CTA */}
//       <Button
//         color="secondary"
//         variant="contained"
//         size="large"
//         component={RouterLink}
//         to="/reservations/"
//         sx={{ minWidth: 220 }}
//       >
//         Check Availability
//       </Button>

//       <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
//         Book direct for the best experience
//       </Typography>
//     </IntroductionLayout>
//   );
// }






import * as React from "react";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Typography from "../components/Typography";
import IntroductionLayout from "./IntroductionLayout";
import { Link as RouterLink } from "react-router-dom";

const backgroundImages = [
  "/images/home/IMG_0325-1920w.avif",
  "/images/home/SlideShow/IMG-20241013-WA0016.avif",
  "/images/home/SlideShow/IMG-20241013-WA0022.avif",
  "/images/home/SlideShow/IMG-20241013-WA0040.avif",
  "/images/home/SlideShow/WhatsApp10_f9eff0d2.avif",
];

export default function Introduction() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <IntroductionLayout
      sxBackground={{
        backgroundColor: "#7fc7d9",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Slideshow below hero (lazy-load) */}
      <div style={{ position: "absolute", inset: 0, zIndex: -2 }}>
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: activeIndex === index ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
            }}
            aria-hidden={activeIndex !== index}
          />
        ))}

        {/* Overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.3)" }} />
      </div>

      {/* Page content */}
      <Typography
        component="h1"
        align="center"
        sx={{
          fontFamily: "'Metal', serif",
          fontSize: { xs: "2rem", sm: "3rem" },
          fontWeight: 400,
          mb: 2,
          color: "#fff"
        }}
      >
        Luxury Eco Kabana in the Knuckles Mountains
      </Typography>

      <Typography component="p" align="center" sx={{ mb: 4, maxWidth: 720, mx: "auto", color: "#fff" }}>
        Vintage Villa is a secluded eco-friendly retreat near the Knuckles
        Mountain Range in Sri Lanka, offering breathtaking views, trekking
        access, organic cuisine, and complete privacy in nature.
      </Typography>

      <Button
        color="secondary"
        variant="contained"
        size="large"
        component={RouterLink}
        to="/reservations/"
        sx={{ minWidth: 220 }}
      >
        Check Availability
      </Button>

      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Book direct for the best experience
      </Typography>
    </IntroductionLayout>
  );
}
