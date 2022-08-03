import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/CenteredHeader";
// import Pricing from "components/pricing/TwoPlansWithDurationSwitcher.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
// import Footer from "components/footers/FiveColumnWithInputForm.js";
import Footer from "components/footers/FiveColumnWithBackground";
import FAQ from "components/faqs/SingleCol.js";

export default () => {
  return (
    <AnimationRevealPage>
      <Header text={"black"} />
      {/* <Pricing /> */}
      <Testimonial heading="Our Paying Customers" />
      <FAQ />
      <Footer />
    </AnimationRevealPage>
  );
};
