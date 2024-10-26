import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../../assets/Logo_transparent_60.png";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  mx: 3,
  // backgroundColor: "black",
};

const leftMenu = ["HOME", "OUR STORY", "THINGS TO DO", "SRILANKAN CUISINE"];
const rightMenu = ["RESERVATIONS", "GALLERY", "CONTACT", "FAQ"];

function AppAppBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = (menu: any[]) => (
    <List>
      {menu.map((item) => (
        <ListItem key={item}>
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            component={RouterLink}
            to="/sign-in/"
            sx={{ width: "100%", textAlign: "left" }}
          >
            {item}
          </Link>
        </ListItem>
      ))}
    </List>
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
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
              // backgroundColor: "pink",
            }}
          >
            {/* Show left menu items on larger screens */}
            {leftMenu.map((item) => (
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                component={RouterLink}
                to="/sign-in/"
                sx={rightLink}
                key={item}
              >
                {item}
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
              fontSize: 24,
              mx:3
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="suitcase"
              sx={{ height: 60 }}
            />
          </Link>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flex: 1,
              justifyContent: "space-between",
              // backgroundColor: "pink",
            }}
          >
            {/* Show right menu items on larger screens */}
            {rightMenu.map((item) => (
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                component={RouterLink}
                to="/sign-in/"
                sx={rightLink}
                key={item}
              >
                {item}
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

