import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className=" w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://cdn.pixabay.com/photo/2015/03/22/15/26/blog-684748_1280.jpg")', // Fixed working image URL
      }}>
      <div className="absolute top-0 -z-10 inset-0 bg-black opacity-80"></div>{" "}
      {/* Overlay for text visibility */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex justify-center items-center h-full text-center text-white">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Our Blog
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover insightful articles on topics that matter to you. Stay
            updated with the latest trends, news, and tips.
          </p>
          <Link
            to="/blog"
            className="inline-block bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300">
            Read Latest Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
