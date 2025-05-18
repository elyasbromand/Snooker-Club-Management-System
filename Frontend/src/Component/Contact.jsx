import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "782f1f43-37d2-496b-b851-5e332b8b74e1");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section
      id="contact"
      className="bg-slate-800 text-white py-16 px-6 md:px-20"
      data-aos="fade-up" // Animation for the entire section
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-4xl font-bold mb-4 text-green-500">Contact Us</h2>
          <p className="text-gray-100 text-lg mb-6">
            Have a question, a table booking, or just want to take membership?
            Fill out the form and let's connect. I am always open to discussing
            new opportunities.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>
              <strong>Email:</strong> elyasbromand3@gmail.com
            </li>
            <li>
              <strong>Phone:</strong> +93 777 123 123 123
            </li>
            <li>
              <strong>Location:</strong> Kabul, Afghanistan
            </li>
          </ul>
        </div>

        {/* Form */}
        <div
          className="bg-black p-8 rounded-lg shadow-lg"
          data-aos="fade-in"
          data-aos-delay="400"
        >
          <form className="space-y-4" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded bg-slate-800 border border-gray-200 text-white focus:outline-none focus:border-green-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded bg-slate-800 border border-gray-200 text-white focus:outline-none focus:border-green-500"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 rounded bg-slate-800 border border-gray-200 text-white focus:outline-none focus:border-green-500"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 transition-colors text-white px-6 py-3 rounded font-semibold"
            >
              Send Message
            </button>
          </form>
          <span>{result}</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
