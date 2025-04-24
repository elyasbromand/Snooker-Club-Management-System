import React from "react";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

const BlogSection = () => {
  const blogPosts = [
    {
      category: "Tournament",
      title: "Vote Your 2023 Snooker Tournament Favorites",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      date: "June 15, 2023",
      readTime: "5 min read",
      link: "#",
      image: "hero4.jpg", // Add your image path
    },
    {
      category: "Track Sheets",
      title: "How to Shoot Pool Shots That Are Tough to Reach",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      date: "May 28, 2023",
      readTime: "7 min read",
      link: "#",
      image: "hero5.jpg", // Add your image path
    },
    {
      category: "Tips",
      title: "Top 4 Mistakes Most Beginner Pool Players Make",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      date: "April 10, 2023",
      readTime: "4 min read",
      link: "#",
      image: "balls.webp", // Add your image path
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 mt-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl text-white font-bold mb-4">LATES BLOG & ARTICLE</h1>
        
        <p className="max-w-2xl mx-auto text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <article
            key={index}
            className="bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image Section */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Text Content */}
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
              <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
              <p className="text-gray-300 mb-4">{post.excerpt}</p>

              <div className="flex items-center text-gray-100 text-sm mb-5">
                <div className="flex items-center mr-4">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <a
                href={post.link}
                className="inline-flex items-center text-green-500 font-medium hover:text-green-600 transition-colors"
              >
                Read More <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
