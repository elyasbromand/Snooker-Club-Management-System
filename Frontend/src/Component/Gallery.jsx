import React from "react";
import { Camera } from "lucide-react";
const Gallery = () => {
  // Sample image data - replace with your actual images
  const images = [
    {
      id: 1,
      src: "hero1.jpg",
      alt: "Image 1",
      column: 1,
      height: "tall",
    },
    {
      id: 2,
      src: "hero2.jpg",
      alt: "Image 2",
      column: 1,
      height: "short",
    },
    {
      id: 3,
      src: "hero3.jpg",
      alt: "Image 3",
      column: 2,
      height: "short",
    },
    {
      id: 4,
      src: "hero4.jpg",
      alt: "Image 4",
      column: 2,
      height: "tall",
    },
    {
      id: 5,
      src: "hero5.jpg",
      alt: "Image 5",
      column: 3,
      height: "tall",
    },
    {
      id: 6,
      src: "hero5.jpg",
      alt: "Image 6",
      column: 3,
      height: "short",
    },
  ];

  // Group images by column
  const columns = [[], [], []];
  images.forEach((image) => {
    columns[image.column - 1].push(image);
  });

  return (
    <div className="max-w-5xl mx-auto px-4 mt-12  py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <Camera className="w-6 h-6 text-green-600" />
          <span className="text-green-600 font-bold text-lg">ART GALLERY</span>
        </div>
        <h1 className="text-4xl text-white font-bold mb-4">
          CAPTURED MOMENTS FROM PLAYERS & MEMBERS
        </h1>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Column 1 */}
        <div className="flex-1 flex flex-col gap-4">
          {columns[0].map((image) => (
            <div
              key={image.id}
              className={`relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ${
                image.height === "tall" ? "h-[65%]" : "h-[35%]"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Column 2 (Middle) */}
        <div className="flex-1 flex flex-col gap-4">
          {columns[1].map((image) => (
            <div
              key={image.id}
              className={`relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ${
                image.height === "tall" ? "h-[70%]" : "h-[30%]"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex-1 flex flex-col gap-4">
          {columns[2].map((image) => (
            <div
              key={image.id}
              className={`relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ${
                image.height === "tall" ? "h-[65%]" : "h-[35%]"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
