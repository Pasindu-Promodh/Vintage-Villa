import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import { Link as RouterLink, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  mx: 3,
};

const leftMenu = [
  { name: "HOME", path: "/" },
  { name: "OUR STORY", path: "/our-story/" },
  { name: "THINGS TO DO", path: "/things-todo/" },
  { name: "SRILANKAN CUISINE", path: "/srilankan-cuisine/" },
];

const rightMenu = [
  { name: "RESERVATIONS", path: "/reservations/" },
  { name: "GALLERY", path: "/gallery/" },
  { name: "CONTACT", path: "/contact/" },
  { name: "FAQ", path: "/faq/" },
];

function AppAppBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const location = useLocation(); // Get the current route

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = (menu: any) => (
    <List>
      {menu.map((item: any) => (
        <ListItem key={item.name}>
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            component={RouterLink}
            to={item.path}
            sx={{
              width: "100%",
              textAlign: "left",
              color: location.pathname === item.path ? "#e8aa33" : "inherit",
              "&:hover": {
                color: "#e8aa33",
              },
            }}
          >
            {item.name}
          </Link>
        </ListItem>
      ))}
    </List>
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" } }} // Show on mobile only
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            {/* Show left menu items on larger screens */}
            {leftMenu.map((item) => (
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                component={RouterLink}
                to={item.path}
                sx={{
                  ...rightLink,
                  color:
                    location.pathname === item.path ? "#e8aa33" : "inherit",
                  "&:hover": {
                    color: "#e8aa33",
                  },
                }}
                key={item.name}
              >
                {item.name}
              </Link>
            ))}
          </Box>

          <Link
            variant="h6"
            underline="none"
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{
              mx: 3,
            }}
          >
            <Box
              component="img"
              src={"/logo.png"}
              alt="logo"
              sx={{
                height: 90,
              }}
            />
          </Link>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            {/* Show right menu items on larger screens */}
            {rightMenu.map((item) => (
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                component={RouterLink}
                to={item.path}
                sx={{
                  ...rightLink,
                  color:
                    location.pathname === item.path ? "#e8aa33" : "inherit",
                  "&:hover": {
                    color: "#e8aa33",
                  },
                }}
                key={item.name}
              >
                {item.name}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {menuItems(leftMenu)}
          {menuItems(rightMenu)}
        </Box>
      </Drawer>
    </div>
  );
}

export default AppAppBar;

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Link from "@mui/material/Link";
// import AppBar from "../components/AppBar";
// import Toolbar from "../components/Toolbar";
// import { Link as RouterLink, useLocation } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";

// const rightLink = {
//   fontSize: 16,
//   color: "common.white",
//   mx: 3,
// };

// const leftMenu = [
//   { name: "HOME", path: "/" },
//   { name: "OUR STORY", path: "/our-story/" },
//   { name: "THINGS TO DO", path: "/things-todo/" },
//   { name: "SRILANKAN CUISINE", path: "/srilankan-cuisine/" },
// ];

// const rightMenu = [
//   { name: "RESERVATIONS", path: "/reservations/" },
//   { name: "GALLERY", path: "/gallery/" },
//   { name: "CONTACT", path: "/contact/" },
//   { name: "FAQ", path: "/faq/" },
// ];

// function AppAppBar() {
//   const [drawerOpen, setDrawerOpen] = React.useState(false);
//   const location = useLocation(); // Get the current route

//   const toggleDrawer = (open: boolean) => () => {
//     setDrawerOpen(open);
//   };

//   const menuItems = (menu: any) => (
//     <List>
//       {menu.map((item: any) => (
//         <ListItem key={item.name}>
//           <Link
//             color="inherit"
//             variant="h6"
//             underline="none"
//             component={RouterLink}
//             to={item.path}
//             sx={{
//               width: "100%",
//               textAlign: "left",
//               color: location.pathname === item.path ? "#e8aa33" : "inherit",
//               "&:hover": {
//                 color: "#e8aa33",
//               },
//             }}
//           >
//             {item.name}
//           </Link>
//         </ListItem>
//       ))}
//     </List>
//   );

//   return (
//     <div>
//       <AppBar position="fixed">
//         <Toolbar
//           sx={{
//             justifyContent: "space-between",
//             display: "flex",
//             alignItems: "center",
//             width: "100%",
//           }}
//         >
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             onClick={toggleDrawer(true)}
//             sx={{ display: { xs: "block", md: "none" } }} // Show on mobile only
//           >
//             <MenuIcon />
//           </IconButton>

//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               flex: 1,
//               justifyContent: "flex-start", // Left side menu items
//             }}
//           >
//             {leftMenu.map((item) => (
//               <Link
//                 color="inherit"
//                 variant="h6"
//                 underline="none"
//                 component={RouterLink}
//                 to={item.path}
//                 sx={{
//                   ...rightLink,
//                   color:
//                     location.pathname === item.path ? "#e8aa33" : "inherit",
//                   "&:hover": {
//                     color: "#e8aa33",
//                   },
//                 }}
//                 key={item.name}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </Box>

//           {/* Logo container with a larger gap */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               flex: 0, // Prevent logo from growing
//               mx: 5, // Larger gap between the logo and buttons
//             }}
//           >
//             <Link
//               variant="h6"
//               underline="none"
//               color="inherit"
//               component={RouterLink}
//               to="/"
//             >
//               <Box
//                 component="img"
//                 src={"/logo.png"}
//                 alt="logo"
//                 sx={{
//                   height: 90,
//                 }}
//               />
//             </Link>
//           </Box>

//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               flex: 1,
//               justifyContent: "flex-end", // Right side menu items
//             }}
//           >
//             {rightMenu.map((item) => (
//               <Link
//                 color="inherit"
//                 variant="h6"
//                 underline="none"
//                 component={RouterLink}
//                 to={item.path}
//                 sx={{
//                   ...rightLink,
//                   color:
//                     location.pathname === item.path ? "#e8aa33" : "inherit",
//                   "&:hover": {
//                     color: "#e8aa33",
//                   },
//                 }}
//                 key={item.name}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Toolbar />

//       <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
//         <Box
//           sx={{ width: 250 }}
//           role="presentation"
//           onClick={toggleDrawer(false)}
//           onKeyDown={toggleDrawer(false)}
//         >
//           {menuItems(leftMenu)}
//           {menuItems(rightMenu)}
//         </Box>
//       </Drawer>
//     </div>
//   );
// }

// export default AppAppBar;
