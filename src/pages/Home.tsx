import * as React from "react";
import Explore from "./modules/views/Explore";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import AppFooter from "./modules/views/AppFooter";
import Introduction from "./modules/views/Introduction";
import Luxury from "./modules/views/Luxury";
import Location from "./modules/views/Location";
import JoinUs from "./modules/views/JoinUs";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import Culinary from "./modules/views/Culinary";
import Testimonials from "./modules/views/Testimonials";

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Introduction />
      <Luxury />
      <Explore />
      <Culinary />
      <Location />
      <Testimonials />
      <JoinUs />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
