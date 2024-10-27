import React, { useEffect } from "react";
import "./App.css";
import Home from "./onepirate/Home";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
