import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import AuthForm from "./AuthForm";
import aboutImage from "../assets/hero2.jpg";
import { FaCheckCircle, FaAward } from "react-icons/fa";

const AboutUs = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section
      className="bg-slate-800 max-w-7xl rounded-2xl mt-8 mx-auto py-10 px-4"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Image */}
        <div
          className="w-full md:w-1/2"
          data-aos="fade-in"
          data-aos-delay="200"
        >
          <img
            src={aboutImage}
            alt="About Us"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Right Content */}
        <div
          className="w-full md:w-1/2 space-y-6"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h2 className="text-green-400 font-bold uppercase tracking-widest text-sm">
            About Us
          </h2>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">
            We Are The Ultimate Family And Snooker Club For Future Champions!
          </h1>
          <p className="text-gray-200">
            Welcome to the premier destination for snooker enthusiasts and
            families alike! Our club is dedicated to fostering talent,
            sportsmanship, and a love for the game in a warm, inclusive
            environment. Join us and be part of a winning legacy!
          </p>

          {/* Experience Box */}
          <div className="flex flex-row gap-8">
            <div
              className="bg-green-600 p-6 rounded-xl w-60 flex flex-col items-center shadow-md"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <FaAward className="text-white text-4xl mb-2" />
              <h3 className="text-3xl font-bold text-gray-100">15+ Years</h3>
              <p className="text-gray-200 mt-1 text-sm">Of Experience</p>
            </div>
            <div
              className="bg-green-600 p-6 rounded-xl w-60 flex flex-col items-center shadow-md"
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              <FaAward className="text-white text-4xl mb-2" />
              <h3 className="text-3xl font-bold text-gray-100">15+ Years</h3>
              <p className="text-gray-200 mt-1 text-sm">Of Experience</p>
            </div>
          </div>

          {/* Features List */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-4"
            data-aos="fade-up"
            data-aos-delay="1000"
          >
            {[
              "Quality Equipment",
              "Best Courses For Beginners",
              "100% Satisfaction Guarantee",
              "Commitment to Members",
              "Professional Coach",
              "Affordable Pricing",
            ].map((item) => (
              <p key={item} className="flex items-center text-gray-100 gap-2">
                <FaCheckCircle className="text-green-400" /> {item}
              </p>
            ))}
          </div>

          <button
            onClick={() => setShowAuthForm(true)}
            className="bg-green-500 hover:bg-green-600 transition px-6 py-2 mx-auto rounded-full text-white font-semibold"
            data-aos="zoom-in-up"
            data-aos-delay="1200"
          >
            Book the Table
          </button>

          <AuthForm
            show={showAuthForm}
            onClose={() => setShowAuthForm(false)}
            initialMode="login"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
