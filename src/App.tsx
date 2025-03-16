import React, { useEffect } from "react";
import "./App.css";
import { SnackbarProvider } from "notistack";
import Home from "./onepirate/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import OurStory from "./onepirate/OurStory";
import ThingsToDo from "./onepirate/ThingsToDo";
import SrilankanCuisine from "./onepirate/SrilankanCuisine";
import Reservations from "./onepirate/Reservations";
import Gallery from "./onepirate/Gallery";
import Contact from "./onepirate/Contact";
import FAQ from "./onepirate/FAQ";
import ForgotPassword from "./onepirate/ForgotPassword";
import Privacy from "./onepirate/Privacy";
import SignIn from "./onepirate/SignIn";
import SignUp from "./onepirate/SignUp";
import Terms from "./onepirate/Terms";
import Refund from "./onepirate/Refund";
import Admin from "./admin/Admin";
import TagManagement from "./admin/TagManagement";
import Bookings from "./admin/Bookings";
import RoomManagement from "./admin/RoomManagement/RoomManagement";
import GalleryManagement from "./admin/GalleryManagement/GalleryManagement";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <React.Fragment>
      <SnackbarProvider maxSnack={4}>
        <Router>
          <ScrollToTop />
          <Switch>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/privacy-policy">
              <Privacy />
            </Route>
            <Route path="/terms-of-use">
              <Terms />
            </Route>
            <Route path="/refund-policy">
              <Refund />
            </Route>
            <Route path="/our-story">
              <OurStory />
            </Route>
            <Route path="/things-todo">
              <ThingsToDo />
            </Route>
            <Route path="/srilankan-cuisine">
              <SrilankanCuisine />
            </Route>
            <Route path="/reservations">
              <Reservations />
            </Route>
            <Route path="/gallery">
              <Gallery />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/faq">
              <FAQ />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/tag-management">
              <TagManagement />
            </Route>
            <Route path="/bookings">
              <Bookings />
            </Route>
            <Route path="/room-management">
              <RoomManagement />
            </Route>
            <Route path="/gallery-management">
              <GalleryManagement />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </SnackbarProvider>
    </React.Fragment>
  );
}

export default App;
