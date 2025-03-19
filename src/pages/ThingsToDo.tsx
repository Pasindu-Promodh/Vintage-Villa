// import * as React from "react";
// import AppFooter from "./modules/views/AppFooter";
// import AppAppBar from "./modules/views/AppAppBar";
// import withRoot from "./modules/withRoot";
// import { Container } from "@mui/material";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Typography from "./modules/components/Typography";
// import { styled } from "@mui/system";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import Markdown from "./modules/components/Markdown";

// // Styled Components for visual enhancement
// const ImageContainer = styled(Box)(({ theme }) => ({
//   marginBottom: theme.spacing(4),
//   "& img": {
//     width: "100%",
//     borderRadius: theme.shape.borderRadius,
//   },
// }));

// const SectionTitle = styled(Typography)(({ theme }) => ({
//   marginBottom: theme.spacing(3),
//   fontWeight: "bold",
//   textTransform: "uppercase",
//   color: theme.palette.primary.main,
// }));

// // Array to hold the section data
// const thingsToDoContent = [
//   {
//     title: "Hiking Trails and Waterfalls",
//     description:
//       "Embark on unforgettable journeys through the lush hiking trails of the Knuckles Mountain Range. Our hotel provides easy access to some of the most scenic and well-preserved paths, taking you through ancient forests, tea plantations, and captivating landscapes. Along the way, be sure to discover the hidden gems of this region, including breathtaking waterfalls that cascade down from the misty heights.",
//     image: "/home/IMG_0325.JPG",
//     alt: "Hiking Trails and Waterfalls",
//     imageOrder: 1,
//     packageDetailsFile: "/packages/hiking-trails-and-waterfalls.md", // path to the markdown file
//     available: true, // Set availability to true
//   },
//   {
//     title: "Meemure Village",
//     description:
//       "Immerse yourself in the culture and traditions of Sri Lanka by visiting the nearby Meemure Village. This picturesque rural hamlet, nestled amidst the mountains, offers a glimpse into the lives of its welcoming residents. Explore the village's rich history, try your hand at traditional crafts, and savor authentic Sri Lankan cuisine prepared by local families.",
//     image: "https://duqjpivknq39s.cloudfront.net/2018/12/meemure.jpg",
//     alt: "Meemure Village",
//     imageOrder: 2,
//     packageDetailsFile: "/packages/meemure-village-package.md", // path to markdown file
//     available: true, // Set availability to false
//   },
//   {
//     title: "Heel-Oya Village",
//     description:
//       "Immerse yourself in the culture and traditions of Sri Lanka by visiting the nearby Meemure Village. This picturesque rural hamlet, nestled amidst the mountains, offers a glimpse into the lives of its welcoming residents. Explore the village's rich history, try your hand at traditional crafts, and savor authentic Sri Lankan cuisine prepared by local families.",
//     image: "/home/WhatsApp Image 2024-11-15 at 15.30.12_fa144f86.jpg",
//     alt: "Heel Oya Village",
//     imageOrder: 2,
//     packageDetailsFile: "/packages/heeloya-village-package.md", // path to markdown file
//     available: true, // Set availability to false
//   },
//   {
//     title: "Corbets Gap",
//     description:
//       "Corbett’s Gap, a renowned attraction in the Knuckles Mountain Range, offers breathtaking views of the surrounding peaks. This deep valley, situated in a rain shadow region, features diverse vegetation ranging from wet and dry to montane types. Accessed via a B-grade road from Hunnasgiriya, a favored starting point for trekkers, Corbett’s Gap is named after a British surveyor, Corbett, who mapped the area. Locally known as 'Attala-Wettuwa,' it stands out as one of the most magnificent and sought-after viewpoints in the Knuckles Mountain Range.",
//     image: "/home/Corbets-Gap.jpg",
//     alt: "Corbets Gap",
//     imageOrder: 2,
//     packageDetailsFile: "/packages/corbets-gap-package.md", // path to markdown file
//     available: true, // Set availability to false
//   },
//   {
//     title: "Kandy",
//     description:
//       "Just a short drive away, the historic city of Kandy awaits your exploration. Known for its UNESCO-listed Temple of the Tooth and vibrant cultural scene, Kandy offers a fascinating blend of history, spirituality, and art. Stroll around the scenic Kandy Lake, visit the Royal Botanical Gardens, and be captivated by the city's unique atmosphere.",
//     image:
//       "https://deih43ym53wif.cloudfront.net/temple-tooth-kandy-sri-lanka-shutterstock_1037797372_24beb3388c.jpeg",
//     alt: "Kandy City",
//     imageOrder: 1,
//     packageDetailsFile: "/packages/kandy-package.md", // path to markdown file
//     available: false, // Set availability to true
//   },
//   {
//     title: "Mini World's End",
//     description:
//       "Experience the awe-inspiring vistas of 'Mini World's End,' a remarkable viewpoint in the Knuckles Mountain Range. Here, you'll be rewarded with panoramic views of the surrounding mountains, valleys, and lush greenery, making it an ideal spot for photographers and nature enthusiasts.",
//     image: "https://duqjpivknq39s.cloudfront.net/2018/12/mini-worlds-end.jpg",
//     alt: "Mini World's End",
//     imageOrder: 2,
//     packageDetailsFile: "/packages/mini-worlds-end-package.md", // path to markdown file
//     available: false, // Set availability to false
//   },
// ];

// function ThingsToDo() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedPackage, setSelectedPackage] = React.useState("");

//   // Fetch markdown content from the file
//   const fetchPackageDetails = async (filePath: string) => {
//     try {
//       const response = await fetch(filePath);
//       const text = await response.text();
//       setSelectedPackage(text);
//       setOpen(true);
//     } catch (error) {
//       console.error("Error fetching package details:", error);
//     }
//   };

//   const handleClickOpen = (packageDetailsFile: string) => {
//     fetchPackageDetails(packageDetailsFile);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <AppAppBar />
//       <Container maxWidth="lg" sx={{ py: 8 }}>
//         {/* Introduction */}
//         <Box sx={{ textAlign: "center", mb: 8 }}>
//           <Typography variant="h3" gutterBottom>
//             Discover the Charms of the Knuckles Mountain Range
//           </Typography>
//           <Typography variant="body1" paragraph>
//             Your Vintage Adventure Awaits!
//           </Typography>
//           <Typography variant="body1">
//             Nestled in the heart of the pristine Knuckles Mountain Range in Sri
//             Lanka, our vintage-themed boutique hotel offers not only a tranquil
//             retreat but also a gateway to a world of enchanting experiences.
//             Explore the timeless allure of this unique region through a variety
//             of activities that cater to nature enthusiasts, culture seekers, and
//             adventure lovers alike.
//           </Typography>
//         </Box>

//         {/* Render the sections dynamically from the array */}
//         {thingsToDoContent.map((section, index) => (
//           <Grid
//             container
//             spacing={6}
//             alignItems="center"
//             key={index}
//             sx={{ mb: 8 }}
//           >
//             <Grid item xs={12} md={6} order={{ xs: section.imageOrder, md: 1 }}>
//               <ImageContainer>
//                 <img src={section.image} alt={section.alt} />
//               </ImageContainer>
//             </Grid>
//             <Grid item xs={12} md={6} order={{ xs: 1, md: section.imageOrder }}>
//               <SectionTitle variant="h4">{section.title}</SectionTitle>
//               <Typography variant="body1" paragraph>
//                 {section.description}
//               </Typography>
//               {section.available ? (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => handleClickOpen(section.packageDetailsFile)}
//                 >
//                   Package Details
//                 </Button>
//               ) : (
//                 <Typography variant="body2" color="textSecondary">
//                   Currently not available
//                 </Typography>
//               )}
//             </Grid>
//           </Grid>
//         ))}

//         {/* Closing Statement */}
//         <Box sx={{ mt: 8, textAlign: "center" }}>
//           <Typography variant="h5" gutterBottom>
//             At our vintage-themed boutique hotel, we believe in offering more
//             than just a place to stay – we provide a gateway to unforgettable
//             experiences.
//           </Typography>
//           <Typography variant="body1">
//             Whether you seek the thrill of hiking, the serenity of waterfalls,
//             the charm of local villages, or the cultural richness of nearby
//             cities, our 'Things to Do' page will guide you through a world of
//             possibilities. Join us on a journey through the timeless wonders of
//             the Knuckles Mountain Range and its surrounding treasures. Your
//             vintage adventure begins here.
//           </Typography>
//         </Box>
//       </Container>
//       <AppFooter />

//       {/* Dialog (Overlay) for Package Details */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Package Details</DialogTitle>
//         <DialogContent>
//           <Markdown>{selectedPackage}</Markdown>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }

// export default withRoot(ThingsToDo);








import * as React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "./modules/components/Typography";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Markdown from "./modules/components/Markdown";

// Styled Components for visual enhancement
const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative", // Positioning for the overlay text
  marginBottom: theme.spacing(4),
  "& img": {
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer", // Make the image clickable
  },
  "& .overlay": {
    position: "absolute",
    top: "10px", // Positioning to the top-left corner
    left: "10px", // Positioning to the top-left corner
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: theme.spacing(1, 3),
    borderRadius: "5px",
    textAlign: "center",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: "bold",
  textTransform: "uppercase",
  color: theme.palette.primary.main,
}));

// Array to hold the section data, including a single tag for filtering
const thingsToDoContent = [
  {
    title: "Hiking Trails and Waterfalls",
    description:
      "Embark on unforgettable journeys through the lush hiking trails of the Knuckles Mountain Range. Our hotel provides easy access to some of the most scenic and well-preserved paths, taking you through ancient forests, tea plantations, and captivating landscapes. Along the way, be sure to discover the hidden gems of this region, including breathtaking waterfalls that cascade down from the misty heights.",
    image: "/home/IMG_0325.JPG",
    imageOrder: 1,
    packageDetailsFile: "/packages/hiking-trails-and-waterfalls.md",
    available: true,
    tag: "Exterior", // Single tag for filtering
  },
  {
    title: "Meemure Village",
    description:
      "Immerse yourself in the culture and traditions of Sri Lanka by visiting the nearby Meemure Village. This picturesque rural hamlet, nestled amidst the mountains, offers a glimpse into the lives of its welcoming residents. Explore the village's rich history, try your hand at traditional crafts, and savor authentic Sri Lankan cuisine prepared by local families.",
    image: "https://duqjpivknq39s.cloudfront.net/2018/12/meemure.jpg",
    imageOrder: 2,
    packageDetailsFile: "/packages/meemure-village-package.md",
    available: true,
    tag: "Meemure", // Single tag for filtering
  },
  {
    title: "Heel-Oya Village",
    description:
      "Immerse yourself in the culture and traditions of Sri Lanka by visiting the nearby Heel-Oya Village. This picturesque rural hamlet, nestled amidst the mountains, offers a glimpse into the lives of its welcoming residents. Explore the village's rich history, try your hand at traditional crafts, and savor authentic Sri Lankan cuisine prepared by local families.",
    image: "/home/WhatsApp Image 2024-11-15 at 15.30.12_fa144f86.jpg",
    imageOrder: 2,
    packageDetailsFile: "/packages/heeloya-village-package.md",
    available: true,
    tag: "Heel-Oya", // Single tag for filtering
  },
  {
    title: "Corbets Gap",
    description:
      "Corbett’s Gap, a renowned attraction in the Knuckles Mountain Range, offers breathtaking views of the surrounding peaks. This deep valley, situated in a rain shadow region, features diverse vegetation ranging from wet and dry to montane types. Accessed via a B-grade road from Hunnasgiriya, a favored starting point for trekkers, Corbett’s Gap is named after a British surveyor, Corbett, who mapped the area. Locally known as 'Attala-Wettuwa,' it stands out as one of the most magnificent and sought-after viewpoints in the Knuckles Mountain Range.",
    image: "/home/Corbets-Gap.jpg",
    imageOrder: 2,
    packageDetailsFile: "/packages/corbets-gap-package.md",
    available: true,
    tag: "Corbets Gap", // Single tag for filtering
  },
  {
    title: "Kandy",
    description:
      "Just a short drive away, the historic city of Kandy awaits your exploration. Known for its UNESCO-listed Temple of the Tooth and vibrant cultural scene, Kandy offers a fascinating blend of history, spirituality, and art. Stroll around the scenic Kandy Lake, visit the Royal Botanical Gardens, and be captivated by the city's unique atmosphere.",
    image:
      "https://deih43ym53wif.cloudfront.net/temple-tooth-kandy-sri-lanka-shutterstock_1037797372_24beb3388c.jpeg",
    imageOrder: 1,
    packageDetailsFile: "/packages/kandy-package.md",
    available: false,
    tag: "Kandy", // Single tag for filtering
  },
  {
    title: "Mini World's End",
    description:
      "Experience the awe-inspiring vistas of 'Mini World's End,' a remarkable viewpoint in the Knuckles Mountain Range. Here, you'll be rewarded with panoramic views of the surrounding mountains, valleys, and lush greenery, making it an ideal spot for photographers and nature enthusiasts.",
    image: "https://duqjpivknq39s.cloudfront.net/2018/12/mini-worlds-end.jpg",
    imageOrder: 2,
    packageDetailsFile: "/packages/mini-worlds-end-package.md",
    available: false,
    tag: "Mini World's End", // Single tag for filtering
  },
];

function ThingsToDo() {
  const [open, setOpen] = React.useState(false);
  const [selectedPackage, setSelectedPackage] = React.useState("");

  // Fetch markdown content from the file
  const fetchPackageDetails = async (filePath: string) => {
    try {
      const response = await fetch(filePath);
      const text = await response.text();
      setSelectedPackage(text);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching package details:", error);
    }
  };

  const handleClickOpen = (packageDetailsFile: string) => {
    fetchPackageDetails(packageDetailsFile);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle image click to go to the gallery page with the tag
  const handleImageClick = (tag: string) => {
    // Navigate to the gallery page and pass the tag as a query parameter
    window.location.href = `/gallery?tag=${tag}`;
  };

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
        {thingsToDoContent.map((section, index) => {
          const altText = section.image.split("/").pop();
          return (
            <Grid
              container
              spacing={6}
              alignItems="center"
              key={index}
              sx={{ mb: 8 }}
            >
              <Grid
                item
                xs={12}
                md={6}
                order={{ xs: section.imageOrder, md: 1 }}
              >
                <ImageContainer>
                  <Button
                    onClick={() => handleImageClick(section.tag)} // Handle image click
                    sx={{
                      p: 0, // Remove padding to make image the entire clickable area
                      borderRadius: "8px",
                      "& img": {
                        width: "100%",
                        borderRadius: "8px",
                      },
                    }}
                  >
                    <img src={section.image} alt={altText} />
                    {/* alt generated programmatically */}
                  </Button>
                  <Box className="overlay">More Photos</Box>
                </ImageContainer>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                order={{ xs: 1, md: section.imageOrder }}
              >
                <SectionTitle variant="h4">{section.title}</SectionTitle>
                <Typography variant="body1" paragraph>
                  {section.description}
                </Typography>
                {section.available ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClickOpen(section.packageDetailsFile)}
                  >
                    Package Details
                  </Button>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Currently not available
                  </Typography>
                )}
              </Grid>
            </Grid>
          );
})}

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

      {/* Dialog (Overlay) for Package Details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Package Details</DialogTitle>
        <DialogContent>
          <Markdown>{selectedPackage}</Markdown>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default withRoot(ThingsToDo);
