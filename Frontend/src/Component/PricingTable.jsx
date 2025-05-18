import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PricingTable = () => {
  const plans = [
    {
      name: "Standard",
      price: "200",
      period: "/hour",
      tag: null,
      bgColor: "bg-gray-800",
      buttonColor: "bg-gray-800 hover:bg-gray-700",
      features: [
        "Peak Hours Access",
        "Free Cue Rental",
        "Basic Table Booking",
        "10% Off Drinks",
      ],
    },
    {
      name: "Premium",
      price: "350",
      period: "/hour",
      tag: "MOST POPULAR",
      bgColor: "bg-green-800",
      buttonColor: "bg-green-800 hover:bg-green-700",
      features: [
        "Unlimited Off-Peak Play",
        "Priority Table Booking",
        "Free Coaching (1 session/month)",
        "20% Off Food & Drinks",
      ],
    },
    {
      name: "VIP",
      price: "500",
      period: "/hour",
      tag: null,
      bgColor: "bg-slate-900",
      buttonColor: "bg-slate-900 hover:bg-gray-900",
      features: [
        "24/7 Access",
        "VIP Lounge Entry",
        "Personal Coach (2 sessions/month)",
        "30% Off All Services",
      ],
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="py-12 px-4 mt-4" data-aos="fade-up">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1
          className="text-4xl font-bold text-center text-gray-100 mb-4"
          data-aos="fade-up"
        >
          Snooker Club Membership Plans
        </h1>

        {/* Description */}
        <p
          className="max-w-2xl mx-auto text-lg text-gray-400 text-center mb-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Join the best snooker club in town! Choose a plan that fits your style
          and enjoy exclusive benefits, priority bookings, and professional
          coaching.
        </p>

        {/* Pricing Cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="flex-1 max-w-md w-full bg-slate-100 text-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              data-aos="zoom-in"
              data-aos-delay={index * 200}
            >
              {/* Plan Tag */}
              {plan.tag && (
                <div className="bg-amber-400 text-black text-sm font-bold py-1 px-4 text-center">
                  {plan.tag}
                </div>
              )}

              {/* Plan Header */}
              <div className={`${plan.bgColor} p-6 text-white`}>
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <p className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-300">{plan.period}</span>
                </p>
              </div>

              {/* Plan Features */}
              <div className="p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <svg
                        className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`${plan.buttonColor} w-full mt-8 py-3 px-6 rounded-lg text-white font-bold transition-colors`}
                >
                  {plan.name === "Standard" ? "Book Now" : "Join Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
