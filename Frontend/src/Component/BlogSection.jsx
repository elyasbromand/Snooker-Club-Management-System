import React, { useEffect } from "react";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const BlogSection = () => {
  const blogPosts = [
    {
      category: "Tournament",
      title: "Vote Your 2023 Snooker Tournament Favorites",
      excerpt:
        "The 2023 Snooker season delivered unforgettable moments—thrilling comebacks, maximum breaks, and nail-biting finals! Now, it’s your turn to pick the champions who impressed you the most....",
      date: "June 15, 2023",
      readTime: "5 min read",
      link: "#",
      image: "hero4.jpg", // Add your image path
    },
    {
      category: "Track Sheets",
      title: "How to Shoot Pool Shots That Are Tough to Reach",
      excerpt:
        "Struggling with awkward, stretched-out pool shots? You’re not alone! Mastering long reaches, rail shots, and tight angles takes technique—not just luck...",
      date: "May 28, 2024",
      readTime: "7 min read",
      link: "#",
      image: "hero5.jpg", // Add your image path
    },
    {
      category: "Tips",
      title: "Top 4 Mistakes Most Beginner Pool Players Make",
      excerpt:
        "Every pool player starts somewhere—but bad habits early on can slow your progress for years! Death Grip on the Cue, Poor Stance & Balance, Chasing Power Over Precision,Ignoring Spin & Angles",
      date: "April 10, 2024",
      readTime: "4 min read",
      link: "#",
      image: "balls.webp", // Add your image path
    },
  ];

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
    <section className="max-w-7xl mx-auto px-4 py-16 mt-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl text-white font-bold mb-4">
          LATEST BLOG & ARTICLE
        </h1>

        <p className="max-w-2xl mx-auto text-gray-300">
          Fresh reads, expert perspectives. Explore the latest blogs and
          articles to level up your knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <article
            key={index}
            className="bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up" // Fade up animation for each blog post
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
              <h3 className="text-xl font-bold text-white mb-3">
                {post.title}
              </h3>
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
