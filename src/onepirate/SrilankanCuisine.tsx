import * as React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "./modules/components/Typography";
import { styled } from "@mui/system";

// Styled Components for visual enhancement
const ImageContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& img": {
    width: "100%",
    borderRadius: theme.shape.borderRadius,
  },
}));

const StaggeredGridContainer = styled(Grid)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: "bold",
  textTransform: "uppercase",
  color: theme.palette.primary.main,
}));

// Array to hold the section data
const sriLankanCuisineContent = [
  {
    title: "A Tapestry of Culinary Diversity",
    description:
      "Sri Lankan cuisine is a delightful tapestry of diverse flavors, influenced by the island's rich history and multicultural heritage. From aromatic rice and fragrant curries to mouthwatering seafood, our culinary offerings showcase the best of Sri Lanka's gastronomic treasures. Explore the bold flavors of traditional dishes like 'Rice and Curry,' 'Hoppers,' and 'Kottu Roti,' all expertly prepared to tantalize your taste buds.",
    images: [
      "/srilankancuisine/asian-6308470.jpg",
      "/srilankancuisine/indiappa-6303118.jpg",
      "/srilankancuisine/kottu-6319363_1280.jpg",
      "/srilankancuisine/rice-6305704.jpg",
    ],
    alt: [
      "Sri Lankan Hoppers",
      "Sri Lankan String Hoppers",
      "Sri Lankan Kottu Roti",
      "Sri Lankan Rice and Curry",
    ],
    imageOrder: 1,
  },
  {
    title: "The Magic of Sri Lankan Spices",
    description:
      "Central to the brilliance of Sri Lankan cuisine is the artful use of spices. Sri Lanka is renowned for its spices, and our chefs take pride in incorporating these authentic flavors into every dish. From the fiery kick of chili peppers to the warmth of cinnamon and the earthy depth of cardamom, our culinary creations are a celebration of the spice-rich heritage of this island nation.",
    images: [
      "/srilankancuisine/spices-1191945.jpg",
      "/srilankancuisine/spices-370114.jpg",
    ],
    alt: ["Spices 1", "Spices 2"],
    imageOrder: 2,
  },
  {
    title: "Tropical Fruits, Vegetables, and Leafy Greens",
    description:
      "Our dedication to authentic Sri Lankan cuisine means embracing the bounty of tropical fruits, vegetables, and leafy greens that flourish in our lush surroundings. You'll find yourself indulging in sweet and succulent mangoes, creamy avocados, aromatic jackfruits, and vibrant greens like gotu kola and kankun, all meticulously prepared to enhance your dining experience.",
    images: ["/home/IMG_0427.JPG", "/home/IMG_0683.JPG"],
    alt: ["Vegetables", "Fruits"],
    imageOrder: 1,
  },
  {
    title: "The Elegance of Ceylon Tea",
    description:
      "No exploration of Sri Lankan cuisine is complete without a nod to the world-famous Ceylon tea. Indulge in the soothing aroma and rich taste of freshly brewed Ceylon tea, sourced from the verdant tea plantations that adorn the Sri Lankan hills. As you savor a cup of this exquisite tea, you'll experience the heritage and tradition that have made Ceylon tea a global favorite.",
    images: ["/srilankancuisine/IMG_0286.JPG", "/home/IMG_0400.JPG"],
    alt: ["Tea Leaves", "Tea"],
    imageOrder: 2,
  },
];

function SrilankanCuisine() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Introduction */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" gutterBottom>
            Savor the Flavors of Sri Lanka
          </Typography>
          <Typography variant="body1" paragraph>
            A Culinary Journey Amidst the Knuckles Mountains
          </Typography>
          <Typography variant="body1">
            At our vintage-themed boutique hotel nestled within the breathtaking
            Knuckles Mountain Range in Sri Lanka, we invite you to embark on a
            culinary adventure like no other. Our Sri Lankan Cuisine page is a
            gateway to a world of tastes, aromas, and traditions that have been
            cherished for centuries.
          </Typography>
        </Box>

        {/* Render the sections dynamically from the array */}
        {sriLankanCuisineContent.map((section, index) => (
          <Grid
            container
            spacing={6}
            alignItems="center"
            key={index}
            sx={{ mb: 8 }}
          >
            <Grid item xs={12} md={6} order={{ xs: section.imageOrder, md: 1 }}>
              {section.images.length > 1 ? (
                // Render multiple images in a staggered or mosaic-like grid
                <StaggeredGridContainer>
                  {section.images.map((img, imgIndex) => (
                    <ImageContainer key={imgIndex}>
                      <img src={img} alt={section.alt[imgIndex]} />
                    </ImageContainer>
                  ))}
                </StaggeredGridContainer>
              ) : (
                // Render a single image if only one is provided
                <ImageContainer>
                  <img src={section.images[0]} alt={section.alt[0]} />
                </ImageContainer>
              )}
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: section.imageOrder }}>
              <SectionTitle variant="h4">{section.title}</SectionTitle>
              <Typography variant="body1" paragraph>
                {section.description}
              </Typography>
            </Grid>
          </Grid>
        ))}

        {/* Closing Statement */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            At our boutique hotel, we take pride in offering a culinary journey
            that not only satisfies your palate but also introduces you to the
            heart and soul of Sri Lanka.
          </Typography>
          <Typography variant="body1">
            Our Sri Lankan Cuisine page is your gateway to an array of dishes
            that celebrate the island's diversity, the spices that ignite your
            senses, the tropical fruits that refresh your taste buds, and the
            Ceylon tea that soothes your spirit. Join us in experiencing the
            rich culinary traditions of Sri Lanka amidst the stunning backdrop
            of the Knuckles Mountain Range. Your vintage gastronomic adventure
            begins here.
          </Typography>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SrilankanCuisine);
