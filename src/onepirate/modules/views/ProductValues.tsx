import * as React from "react";
import { Theme, styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";

import img1 from "../../../assets/Room1.jpg";
import img2 from "../../../assets/clock-2663148.jpg";
import img3 from "../../../assets/balcony-6901032.jpg";
import ButtonBase from "@mui/material/ButtonBase";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: 300,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.8,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    //border: "4px solid currentColor",
    opacity: 1,
  },
  "& .imageTitle": {
    opacity: 0,
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
    transition: theme.transitions.create("opacity"),
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        overflow: "hidden",
        bgcolor: "secondary.light",
      }}
    >
      <Container
        sx={{
          mt: 15,
          mb: 30,
          display: "flex",
          position: "relative",
          flexDirection: "column",
        }}
        style={{
          maxWidth: "none",
        }}
      >
        <Box sx={{ ml: 3 }}>
          <Typography variant="h6" sx={{ my: 5 }}>
            Unwind in vintage-inspired luxury
          </Typography>
        </Box>
        <Box
          component="img"
          src="/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            zIndex: 0,
          }}
        />
        <Grid container spacing={0}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              {/* <Box
                component="img"
                src="/productValues1.svg"
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                The best luxury hotels
              </Typography>
              <Typography variant="h5">
                {
                  "From the latest trendy boutique hotel to the iconic palace with XXL pool"
                }
                {
                  ", go for a mini-vacation just a few subway stops away from your home."
                }
              </Typography> */}
              {/* <Box
                component="img"
                src={img1}
                alt="suitcase"
                sx={{ height: 300, zIndex: 1 }}
              /> */}
              <ImageIconButton>
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundSize: "cover",
                    //backgroundPosition: "center 40%",
                    backgroundImage: `url(${img1})`,
                  }}
                />
                <ImageBackdrop className="imageBackdrop" />
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "common.white",
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h6"
                    color="inherit"
                    className="imageTitle"
                  >
                    Each of our luxury rooms at the vintage-themed villa is a
                    masterpiece of design, offering an immersive journey into a
                    bygone era while pampering you with modern comforts.
                  </Typography>
                </Box>
              </ImageIconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              {/* <Box
                component="img"
                src="/productValues2.svg"
                alt="graph"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                New experiences
              </Typography>
              <Typography variant="h5">
                {
                  "Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… "
                }
                {"your Sundays will not be alike."}
              </Typography> */}
              {/* <Box
                component="img"
                src={img2}
                alt="suitcase"
                sx={{ height: 300, zIndex: 1 }}
              /> */}
              <ImageIconButton>
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundSize: "cover",
                    //backgroundPosition: "center 40%",
                    backgroundImage: `url(${img2})`,
                  }}
                />
                <ImageBackdrop className="imageBackdrop" />
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "common.white",
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h6"
                    color="inherit"
                    className="imageTitle"
                  >
                    Antique furnishings and period-inspired decor transport you
                    to a time of refined elegance. Our vintage rooms are a
                    symphony of muted hues, ornate accents, and soft lighting,
                    creating an ambiance of intimate grandeur.
                  </Typography>
                </Box>
              </ImageIconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              {/* <Box
                component="img"
                src="/productValues3.svg"
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Exclusive rates
              </Typography>
              <Typography variant="h5">
                {"By registering, you will access specially negotiated rates "}
                {"that you will not find anywhere else."}
              </Typography> */}
              {/* <Box
                component="img"
                src={img3}
                alt="suitcase"
                sx={{ height: 300, zIndex: 1 }}
              /> */}
              <ImageIconButton>
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundSize: "cover",
                    //backgroundPosition: "center 40%",
                    backgroundImage: `url(${img3})`,
                  }}
                />
                <ImageBackdrop className="imageBackdrop" />
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "common.white",
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h6"
                    color="inherit"
                    className="imageTitle"
                  >
                    Whether you choose a room with a forest view or a private
                    balcony overlooking the mountains, each luxury space offers
                    a tranquil escape. Allow the gentle rustling of leaves and
                    the scent of fresh mountain air to lull you into a peaceful
                    slumber.
                  </Typography>
                </Box>
              </ImageIconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
