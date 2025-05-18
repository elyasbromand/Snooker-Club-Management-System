import React, { useEffect } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaCcMastercard, FaCcPaypal, FaCcVisa } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({
      duration: 1200,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <footer className="bg-black-800 text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4" data-aos="fade-up">
            <h1 className="text-3xl font-bold">Sniper Snooker</h1>
            <p className="text-white hover:text-green-500">
              We are the Champions of snooker in Kabul, entire Afghanistan.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-green-400 flex-shrink-0" />
                <p className="text-white hover:text-green-500">
                  Shahre-now No.69, Kabul Afghanistan.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-400" />
                <p className="text-white hover:text-green-500">
                  elyasbromand3@gmail.com
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400" />
                <p className="text-white hover:text-green-500">
                  (+93 777 123 123 123)
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {["About Us", "Booking", "Membership", "Gallery", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white hover:text-green-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Useful Links */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h2 className="text-xl font-bold mb-4">Useful Links</h2>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms and Conditions", "Support", "FAQ"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white hover:text-green-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Opening Hours */}
          <div data-aos="fade-up" data-aos-delay="600">
            <h2 className="text-xl font-bold mb-4">Opening Hours</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {["Saturday - Wednesday", "Wednesday - Thursday"].map((day) => (
                  <p key={day} className="text-white hover:text-green-500">
                    {day}
                  </p>
                ))}
              </div>
              <div className="space-y-2">
                {["09:00 AM - 11:00 PM", "08:00 AM - 12:00 PM"].map((time) => (
                  <p key={time} className="text-white hover:text-green-500">
                    {time}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <FaCcMastercard className="w-8 h-8 text-white hover:text-green-500" />
              <FaCcPaypal className="w-8 h-8 text-white hover:text-green-500" />
              <FaCcVisa className="w-8 h-8 text-white hover:text-green-500" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom Section */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <p className="text-gray-400 text-sm">
            Sniper Snooker created by Boolean Autocrats Team of Developer
          </p>
          <p className="text-gray-400 text-sm">
            Copyright © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
