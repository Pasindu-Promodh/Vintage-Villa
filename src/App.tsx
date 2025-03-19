import React, { useEffect } from "react";
import "./App.css";
import { SnackbarProvider } from "notistack";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import OurStory from "./pages/OurStory";
import ThingsToDo from "./pages/ThingsToDo";
import SrilankanCuisine from "./pages/SrilankanCuisine";
import Reservations from "./pages/Reservations";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";

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
