import React from "react";
import aboutImage from "../assets/hero2.jpg"; // You can replace this with a proper horizontal image
import { FaCheckCircle, FaAward, } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="bg-slate-800 max-w-7xl rounded-2xl mt-8 mx-auto py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <img
            src={aboutImage}
            alt="About Us"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-green-400 font-bold uppercase tracking-widest text-sm ">
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
            <div className="bg-green-600 p-6 rounded-xl w-60 flex flex-col items-center shadow-md">
              <FaAward className="text-white text-4xl mb-2" />
              <h3 className="text-3xl font-bold text-gray-100">
                15<>+</>
              </h3>
              <p className="text-gray-200 mt-1 text-sm">Years of Experience</p>
            </div>
            <div className="bg-green-600 p-6 rounded-xl w-60 flex flex-col items-center shadow-md">
              <FaAward className="text-white text-4xl mb-2" />
              <h3 className="text-3xl text-white font-bold">
                15<>+</>
              </h3>
              <p className="text-gray-200 mt-1 text-sm">Years of Experience</p>
            </div>
          </div>
          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-4">
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

          <button className="bg-green-500 hover:bg-green-600 transition px-6 py-2 mx-auto rounded-full text-white font-semibold">
            Book the Table
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
