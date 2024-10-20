import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../../assets/Logo_transparent_60.png";

function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ fontSize: 24 }}
          >
            <Box
              component="img"
              src={logo}
              alt="suitcase"
              sx={{ height: 60 }}
            />
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
