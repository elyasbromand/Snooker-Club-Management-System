import React, { useState, useEffect } from "react";
import AuthForm from "./AuthForm";
import AOS from "aos";
import "aos/dist/aos.css";

const BecomeMember = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);

  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div
      className="relative w-full h-72 bg-cover bg-center mx-auto"
      style={{ backgroundImage: "url('hero5.jpg')" }}
    >
      <div className="absolute inset-0 rounded-xl bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-16 py-12 text-white">
        <div
          className="max-w-xl text-left space-y-4"
          data-aos="fade-up" 
        >
          <h1 className="text-4xl md:text-5xl font-bold text-amber-400">
            Become A Member
          </h1>
          <p className="text-md md:text-lg">
            Our world-class coaching programs, professional-grade tables, and
            competitive league system provide the perfect training ground to
            elevate your game
          </p>
        </div>

        <div
          className="mt-10 md:mt-0 flex flex-col space-y-4"
         
        >
          <button
            onClick={() => setShowAuthForm(true)}
            className="px-6 py-3 bg-amber-400 hover:bg-green-600 rounded-xl font-semibold transition"
          >
            Create Account
          </button>
          <AuthForm
            show={showAuthForm}
            onClose={() => setShowAuthForm(false)}
            initialMode="login" // Default to login form
          />
        </div>
      </div>
    </div>
  );
};

export default BecomeMember;
