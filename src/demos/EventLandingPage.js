import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import Features from "components/features/VerticalWithAlternateImageAndText.js";
import SliderCard from "components/cards/ThreeColSlider.js";
// import Blog from "components/blogs/ThreeColSimpleWithImage.js";
// import Testimonial from "components/testimonials/TwoColumnWithImage.js";
// import ContactUsForm from "components/forms/SimpleContactUs.js";
import Footer from "components/footers/FiveColumnWithBackground";

export default () => (
  <AnimationRevealPage>
    <Hero />
    <Features />
    <SliderCard />
    {/* <Blog /> */}
    {/* <Testimonial /> */}
    {/* <ContactUsForm /> */}
    <Footer />
  </AnimationRevealPage>
);
