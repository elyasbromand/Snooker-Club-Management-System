import React, { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import right from "../assets/hero6.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "Eightsy has transformed my game completely. The coaches are world-class and the facilities are top-notch.",
      author: "Ali Ahmadi",
      role: "Player",
      image: "user.jpg",
    },
    {
      id: 2,
      quote:
        "As a businessman, I appreciate the professional atmosphere. It's the perfect place to network while enjoying snooker.",
      author: "Habib",
      role: "Player",
      image: "user.jpg",
    },
    {
      id: 3,
      quote:
        "The best snooker club in town. The tables are perfectly maintained and the community is welcoming.",
      author: "Umar",
      role: "Team Leader",
      image: "user.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
    });

    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side - Image */}
        <div className="lg:w-1/2" data-aos="fade-in">
          <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square">
            <img
              src={right}
              alt="Eightsy Snooker Club"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Testimonials */}
        <div className="lg:w-1/2" data-aos="fade-up">
          <span className="inline-block text-green-600 font-bold text-lg mb-2">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl text-white font-bold mb-6">
            WHAT THEY SAY ABOUT CLUB
          </h2>

          <p className="text-gray-200 mb-10">
            Discover what our members have to say about their experience with
            us. From passionate players to first-time visitors, the stories
            shared reflect the spirit, community, and excitement that make our
            club truly special.
          </p>

          {/* Testimonial Card */}
          <div
            className="relative bg-slate-800 p-8 rounded-lg shadow-lg"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            data-aos="zoom-in"
          >
            <Quote className="text-green-400 w-10 h-10 mb-4" />

            <p className="text-gray-100 text-lg mb-8">
              "{testimonials[currentIndex].quote}"
            </p>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-400 mb-3">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-white text-lg">
                {testimonials[currentIndex].author}
              </h4>
              <p className="text-gray-400">{testimonials[currentIndex].role}</p>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
              <button
                onClick={prevTestimonial}
                className="bg-gray-300 -ml-8 mt-4 p-2 rounded-full shadow-md hover:bg-gray-100"
              >
                <ChevronLeft className="text-gray-700" />
              </button>
              <button
                onClick={nextTestimonial}
                className="bg-gray-300 mr-6 p-2 mt-4 rounded-full shadow-md hover:bg-gray-100"
              >
                <ChevronRight className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
