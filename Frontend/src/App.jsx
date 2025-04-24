import React from "react";
import Hero from "./Component/Hero";
import Navbar from "./Component/Navbar";
import FeaturesSection from "./Component/FeaturesSection";
import AboutUs from "./Component/AboutUs";
import PricingTable from "./Component/PricingTable";
import FullWidthSection from "./Component/FullWidthSection";
import Testimonials from "./Component/Testimonials";
import StatsContainer from "./Component/StatsContainer";
import BecomeMember from "./Component/BecomeMember";
import BlogSection from "./Component/BlogSection";
import Footer from "./Component/Footer";
import Contact from "./Component/Contact";
import Gallery from "./Component/Gallery";
function App() {
  return (
    <div className="bg-black">
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section>
          <FeaturesSection />
        </section>
        <section id="about">
          <AboutUs />
        </section>
        <section id="membership">
          <PricingTable />
        </section>
        <section>
          <FullWidthSection />
        </section>
        <section>
          <StatsContainer />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
        <section>
          <Testimonials />
        </section>
        <section id="booking">
         <BecomeMember />
        </section>
        <section>
          <BlogSection />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
