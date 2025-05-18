import React from "react";
import { Users, Table, Calendar, Award } from "react-feather";

const StatsContainer = () => {
  const stats = [
    {
      icon: <Users className="w-10 h-10 mx-auto" />,
      value: "2,450",
      label: "Happy Players",
    },
    {
      icon: <Table className="w-10 h-10 mx-auto" />,
      value: "20",
      label: "Billiard Tables",
    },
    {
      icon: <Calendar className="w-10 h-10 mx-auto" />,
      value: "15",
      label: "Years Of Experience",
    },
    {
      icon: <Award className="w-10 h-10 mx-auto" />,
      value: "40",
      label: "Professional Coaches",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-12 py-12 -mt-12 z-auto bg-slate-800 rounded-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{ backgroundImage: "url('hero5.jpg')" }}
            className="bg-gray-800 rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up animate-once animate-duration-[1200ms] animate-ease-out"
          >
            <div className="text-green-400 mb-4">{stat.icon}</div>
            <h2 className="text-4xl font-bold text-white mb-2">{stat.value}</h2>
            <p className="text-gray-300 text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsContainer;
