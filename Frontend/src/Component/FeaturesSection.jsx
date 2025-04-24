import React from "react";
import {
  ShieldCheck,
  Clock3,
  Users,
  Sparkles,
  UserCog,
  BarChart3,
} from "lucide-react"; // lucide icons

const features = [
  {
    icon: <ShieldCheck size={44} className="text-green-500" />,
    title: "Secure Booking",
    description:
      "Book your snooker sessions with confidence and top-tier security.",
  },
  {
    icon: <Clock3 size={44} className="text-green-500" />,
    title: "24/7 Access",
    description: "Enjoy uninterrupted playtime anytime—day or night.",
  },
  {
    icon: <Users size={44} className="text-green-500" />,
    title: "Member Benefits",
    description: "Get exclusive deals and perks with our membership program.",
  },
  {
    icon: <Sparkles size={44} className="text-green-500" />,
    title: "Clean Environment",
    description:
      "Our snooker space is regularly maintained to provide a spotless and refreshing atmosphere.",
  },
  {
    icon: <UserCog size={44} className="text-green-500" />,
    title: "Staff Maintenance",
    description:
      "Professional staff are always on hand to maintain the space and assist with any needs.",
  },
  {
    icon: <BarChart3 size={44} className="text-green-500" />,
    title: "Player Ranking",
    description:
      "Track and compare player performance with a real-time ranking system.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-black text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">
          Why Choose Us?
        </h1>
        <p className="text-gray-100 mb-12">
          Experience snooker like never before with our fully equipped facility
          and smart features.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-100 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
