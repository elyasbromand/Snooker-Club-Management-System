import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import AuthForm from "./AuthForm"; // Adjust the path as needed
import bgImage1 from "../assets/hero1.jpg";
import bgImage3 from "../assets/hero3.jpg";
import bgImage4 from "../assets/hero4.jpg";
import bgImage5 from "../assets/hero5.jpg";
import bgImage6 from "../assets/hero6.jpg";

const images = [bgImage1, bgImage3, bgImage4, bgImage5, bgImage6];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAuthForm, setShowAuthForm] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div
      className="relative w-full h-screen pt-20 overflow-hidden"
      data-aos="fade"
    >
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100 z-0" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 px-4 text-center max-w-2xl mx-auto text-white flex flex-col justify-center h-full">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-green-400"
          data-aos="fade-up"
        >
          Precision, Strategy, Excellence <br /> Welcome to Snooker!
        </h1>
        <p
          className="text-sm sm:text-base mb-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Discover expert tips, live tournaments, and the best gear to sharpen
          your snooker skills. Whether you're a beginner or a seasoned player,
          we’ve got everything you need to dominate the table
        </p>
        <button
          onClick={() => setShowAuthForm(true)}
          className="bg-green-500 hover:bg-green-700 text-white justify-center mx-auto px-6 py-2 font-bold rounded-full transition"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          Book Table Now!
        </button>
        <AuthForm
          show={showAuthForm}
          onClose={() => setShowAuthForm(false)}
          initialMode="login" // Default to login form
        />
      </div>
    </div>
  );
};

export default Hero;
