import React from "react";
const FullWidthSection = () => {
  return (
    <div
      className="relative mt-4 w-full h-96 bg-cover bg-center max-w-7xl rounded-xl mx-auto"
      style={{ backgroundImage: "url('hero4.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0  rounded-xl"></div>
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-16 py-12 text-white">
        {/* Left side */}
        <div className="max-w-xl text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-400 ">
            Become A Professional Player With Us
          </h1>
          <p className="text-md md:text-lg">
            Our world-class coaching programs, professional-grade tables, and
            competitive league system provide the perfect training ground to
            elevate your game
          </p>
        </div>

        {/* Right side */}
        <div className="mt-10 md:mt-0 flex flex-col space-y-4">
          <button className="px-6 py-3 bg-amber-400 hover:bg-green-600 rounded-xl font-semibold transition">
            Book Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullWidthSection;
