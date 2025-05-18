import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import AuthForm from "./Component/AuthForm";
import AdminDashboard from "./Component/AdminDashboard";
import PersonalDashboard from "./Component/PersonalDashboard";

function App() {
  const [showAuthForm, setShowAuthForm] = useState(false);

  return (
    <Router>
      <div className="bg-black">
        {/* AuthForm Modal (shown on all pages when triggered) */}
        <AuthForm show={showAuthForm} onClose={() => setShowAuthForm(false)} />

        <Routes>
          {/* Main Website Routes (with Navbar and Footer) */}
          <Route
            path="/*"
            element={
              <>
                <Navbar onLoginClick={() => setShowAuthForm(true)} />
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
              </>
            }
          />

          {/* Dashboard Routes (without Navbar/Footer) */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/personal-dashboard" element={<PersonalDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
