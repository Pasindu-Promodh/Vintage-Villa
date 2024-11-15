// import * as React from "react";
// import { Theme } from "@mui/material/styles";
// import { SxProps } from "@mui/system";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container";
// import Button from "../components/Button";
// import Typography from "../components/Typography";

// const item: SxProps<Theme> = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   px: 5,
// };

// const number = {
//   fontSize: 24,
//   fontFamily: "default",
//   color: "secondary.main",
//   fontWeight: "medium",
// };

// const image = {
//   height: 55,
//   my: 4,
// };

// function ProductHowItWorks() {
//   return (
//     <Box
//       component="section"
//       sx={{ display: "flex", 
//         // bgcolor: "secondary.light", 
//         bgcolor: "background.paper",
//         overflow: "hidden" }}
//     >
//       <Container
//         sx={{
//           mt: 10,
//           mb: 15,
//           position: "relative",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
//           Getting Here
//         </Typography>
//         <div>
//           <Grid container spacing={5}>
//             <Grid item xs={12} md={4}>
//               <Box sx={item}>
//                 <Box sx={number}>1.</Box>
//                 <Box
//                   component="img"
//                   src="/productHowItWorks1.svg"
//                   alt="suitcase"
//                   sx={image}
//                 />
//                 <Typography variant="h5" align="center">
//                   Appointment every Wednesday 9am.
//                 </Typography>
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Box sx={item}>
//                 <Box sx={number}>2.</Box>
//                 <Box
//                   component="img"
//                   src="/productHowItWorks2.svg"
//                   alt="graph"
//                   sx={image}
//                 />
//                 <Typography variant="h5" align="center">
//                   First come, first served. Our offers are in limited
//                   quantities, so be quick.
//                 </Typography>
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Box sx={item}>
//                 <Box sx={number}>3.</Box>
//                 <Box
//                   component="img"
//                   src="/productHowItWorks3.svg"
//                   alt="clock"
//                   sx={image}
//                 />
//                 <Typography variant="h5" align="center">
//                   {"New offers every week. New experiences, new surprises. "}
//                   {"Your Sundays will no longer be alike."}
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </div>
//         {/* Google Map Embed */}
//         <Box
//           sx={{
//             width: "100%",
//             height: "400px",
//             mt: 8,
//             mb: 4,
//           }}
//         >
//           <iframe
//             title="Google Map Location"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.040095634347!2d80.81771447571603!3d7.34939451301371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4a1c18fbb805f%3A0x6e2b430eceb4c37f!2sThe%20Vintage%20Villa!5e0!3m2!1sen!2slk!4v1730012870644!5m2!1sen!2slk"
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen
//             loading="lazy"
//           ></iframe>
//         </Box>
//         {/* Get Directions Link */}
//         <a
//           href="https://www.google.com/maps/dir/?api=1&destination=The+Vintage+Villa,+Thangappuwa+Road,+Rangala"
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ textDecoration: "none" }}
//         >
//           <Button
//             color="secondary"
//             size="large"
//             variant="contained"
//             sx={{ mt: 8 }}
//           >
//             Get Directions
//           </Button>
//         </a>
//       </Container>
//     </Box>
//   );
// }

// export default ProductHowItWorks;





import * as React from "react";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "../components/Button";
import Typography from "../components/Typography";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "background.paper", overflow: "hidden" }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          Getting Here
        </Typography>
        <div>
          <Grid container spacing={5}>
            {/* Step 1 */}
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src="/productHowItWorks1.svg"
                  alt="kandy-to-theldeniya"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Kandy to Theldeniya (20 km) via the Kandy-Mahiyangana road.
                </Typography>
              </Box>
            </Grid>
            {/* Step 2 */}
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src="/productHowItWorks2.svg"
                  alt="theldeniya-to-thangappuwa"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Theldeniya to Thangappuwa via Rangala town (20 km).
                </Typography>
              </Box>
            </Grid>
            {/* Step 3 */}
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src="/productHowItWorks3.svg"
                  alt="thangappuwa-to-aanamale"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Thangappuwa to Aanamale road (1.5 km).
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        {/* Google Map Embed */}
        <Box
          sx={{
            width: "100%",
            height: "400px",
            mt: 8,
            mb: 4,
          }}
        >
          <iframe
            title="Google Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.040095634347!2d80.81771447571603!3d7.34939451301371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4a1c18fbb805f%3A0x6e2b430eceb4c37f!2sThe%20Vintage%20Villa!5e0!3m2!1sen!2slk!4v1730012870644!5m2!1sen!2slk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </Box>
        {/* Get Directions Link */}
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=The+Vintage+Villa,+Thangappuwa+Road,+Rangala"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Button
            color="secondary"
            size="large"
            variant="contained"
            sx={{ mt: 8 }}
          >
            Get Directions
          </Button>
        </a>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
