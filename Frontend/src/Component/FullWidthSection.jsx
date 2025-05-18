import React, { useState, useEffect } from "react";
import AuthForm from "./AuthForm"; // adjust if your path is different
import AOS from "aos";
import "aos/dist/aos.css";

const FullWidthSection = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="relative mt-4 w-full h-96 bg-cover bg-center max-w-7xl rounded-xl mx-auto overflow-hidden"
      style={{ backgroundImage: "url('hero4.jpg')" }}
      data-aos="fade-up"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-16 py-12 text-white">
        {/* Left Side */}
        <div className="max-w-xl text-left space-y-4" data-aos="fade-right">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-400">
            Become A Professional Player With Us
          </h1>
          <p className="text-md md:text-lg">
            Our world-class coaching programs, professional-grade tables, and
            competitive league system provide the perfect training ground to
            elevate your game.
          </p>
        </div>

        {/* Right Side */}
        <div
          className="mt-10 md:mt-0 flex flex-col space-y-4"
  
        >
          <button
            onClick={() => setShowAuthForm(true)}
            className="px-6 py-3 bg-amber-400 hover:bg-green-600 rounded-xl font-semibold transition"
          >
            Book Table
          </button>
          <AuthForm
            show={showAuthForm}
            onClose={() => setShowAuthForm(false)}
            initialMode="login"
          />
        </div>
      </div>
    </div>
  );
};

export default FullWidthSection;
