import * as React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import {
  Container,
  Box,
  Grid,
  Typography,
  Dialog,
  IconButton,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

interface Tag {
  id: string;
  name: string;
  count: number;
  createdAt: number;
}

interface Photo {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  tags: string[];
  storagePath: string;
  size: number;
  filename: string;
  uploadDate: number;
  displayOrder: number;
}

const ImageContainer = styled(Box)(({ theme }) => ({
  aspectRatio: "16/10",
  overflow: "hidden",
  position: "relative", // Add this line for proper positioning of absolute elements
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: theme.shape.borderRadius,
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease", // Add opacity transition
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
}));

const ImageLoadingContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: "#000000", // Black background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 1,
}));

function Gallery() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tagFromUrl = query.get("tag");

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Photo | null>();
  const [selectedTag, setSelectedTag] = useState("All"); // Default to All and update after tags are loaded
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchTags(), fetchPhotos()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle tag from URL query after tags are loaded
  useEffect(() => {
    if (tagFromUrl && tags.length > 0) {
      // Find the tag ID that matches the name from the URL
      const matchingTag = tags.find((tag) => tag.name === tagFromUrl);
      if (matchingTag) {
        setSelectedTag(matchingTag.id);
      } else {
        // If no matching tag is found, default to "All"
        setSelectedTag("All");
      }
    }
  }, [tagFromUrl, tags]);

  const handleClickOpen = (image: Photo) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleTagClick = (tagId: string) => {
    setSelectedTag(tagId);
  };

  // Fetch all tags from Firestore
  const fetchTags = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tags"));
      const tagList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "",
          count: data.count || 0,
          createdAt: data.createdAt || Date.now(),
        };
      }) as Tag[];

      // If tags were successfully fetched, use them
      if (tagList.length > 0) {
        setTags(tagList);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  // Fetch Photos from Firestore
  const fetchPhotos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "photos"));
      const photoList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Ensure tags is always an array (for backwards compatibility)
          tags: Array.isArray(data.tags) ? data.tags : [],
          // Ensure displayOrder exists
          displayOrder: data.displayOrder || 0,
        };
      }) as Photo[];

      // Sort photos by displayOrder
      const sortedPhotos = [...photoList];
      sortedPhotos.sort(
        (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
      );

      if (sortedPhotos.length > 0) {
        setPhotos(sortedPhotos);
      } else {
        // Use fallback images if no photos were fetched
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
      // Use fallback images if there was an error
    }
  };

  // Filter images based on selected tag
  const filteredImages =
    selectedTag === "All"
      ? photos
      : photos.filter((photo) => photo.tags.includes(selectedTag));

  return (
    <React.Fragment>
      <AppAppBar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" gutterBottom>
            Explore Our Gallery
          </Typography>
          <Typography variant="body1" paragraph>
            Discover the stunning beauty of our property and its surroundings.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography>Loading gallery...</Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Button
                key="all-tag"
                variant={selectedTag === "All" ? "contained" : "outlined"}
                onClick={() => handleTagClick("All")}
                sx={{
                  mx: 1,
                  my: 1,
                }}
              >
                All
              </Button>
              {tags.map((tag) => (
                <Button
                  key={tag.id}
                  variant={selectedTag === tag.id ? "contained" : "outlined"}
                  onClick={() => handleTagClick(tag.id)}
                  sx={{
                    mx: 1,
                    my: 1,
                  }}
                >
                  {tag.name}
                </Button>
              ))}
            </Box>
            <Typography variant="h6" sx={{ textAlign: "center", mb: 4 }}>
              {filteredImages.length} Images Showing
            </Typography>
            <Grid
              container
              spacing={4}
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                "@media (max-width: 600px)": {
                  gridTemplateColumns: "repeat(2, 1fr)",
                },
              }}
            >
              {filteredImages.map((photo, index) => {
                const altText = photo.filename;
                return (
                  <Grid item key={photo.id || index}>
                    <ImageContainer onClick={() => handleClickOpen(photo)}>
                      {/* Loading circle on black background */}
                      <ImageLoadingContainer>
                        <CircularProgress
                          size={50}
                          thickness={4}
                          sx={{ color: "#D4AF37" }} // Gold color
                        />
                      </ImageLoadingContainer>

                      {/* Image with fade-in effect */}
                      <img
                        src={photo.thumbnailUrl}
                        alt={altText}
                        style={{
                          opacity: 0, // Start with invisible image
                          zIndex: 2, // Place above loading indicator
                          position: "relative",
                        }}
                        onLoad={(e) => {
                          // When loaded, make visible with animation
                          (e.target as HTMLImageElement).style.opacity = "1";
                        }}
                        onError={(e) => {
                          // On error, try to use a fallback or show error state
                          console.error(
                            `Failed to load image: ${photo.thumbnailUrl}`
                          );
                          // You could set a default image here if needed
                        }}
                        loading="lazy"
                      />
                    </ImageContainer>
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </Container>
      {/* <Dialog open={open} onClose={handleClose} maxWidth="md">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {selectedImage && (
          <Box
            component="img"
            src={selectedImage.imageUrl}
            alt={selectedImage.filename}
            sx={{ width: "100%", maxHeight: "90vh" }}
          />
        )}
      </Dialog> */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        PaperProps={{
          sx: {
            backgroundColor: "#000000",
            overflow: "hidden", // Prevents scrollbars
            maxHeight: "90vh",
            maxWidth: "90vw",
            height: "auto",
            width: "auto",
            margin: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#ffffff",
            zIndex: 3,
            backgroundColor: "rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.5)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {selectedImage && (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              backgroundColor: "#000000",
            }}
          >
            {/* Loading indicator */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
              }}
            >
              <CircularProgress
                size={80}
                thickness={4}
                sx={{ color: "#D4AF37" }}
              />
            </Box>

            {/* Full-size image with fade-in effect */}
            <Box
              component="img"
              src={selectedImage.imageUrl}
              alt={selectedImage.filename}
              sx={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                position: "relative",
                zIndex: 2,
                opacity: 0,
                transition: "opacity 0.5s ease",
                display: "block", // Prevents extra space below image
              }}
              onLoad={(e) => {
                // When image loads, adjust dialog size based on image dimensions
                const img = e.target as HTMLImageElement;
                img.style.opacity = "1";

                // Get aspect ratio and adjust dialog accordingly
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                const isPortrait = aspectRatio < 1;

                // Find dialog paper element (parent container)
                const dialogPaper = img.closest(".MuiPaper-root");
                if (dialogPaper) {
                  // For portrait images, adjust width to fit the image height
                  if (isPortrait) {
                    (dialogPaper as HTMLElement).style.width = "auto";
                    (dialogPaper as HTMLElement).style.maxWidth = "90vw";
                  }
                }
              }}
            />
          </Box>
        )}
      </Dialog>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Gallery);
