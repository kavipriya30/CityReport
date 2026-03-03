import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold mb-6 text-purple-800 animate-fade-in">
          🌟 Report Public Issues Easily
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
          Help make your community better by reporting infrastructure issues. 
          Track progress and see real change happen.
        </p>
        <div className="space-x-4">
          <Link 
            to="/report" 
            className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            📝 Report Issue
          </Link>
          <Link 
            to="/track" 
            className="inline-block bg-white hover:bg-gray-50 text-purple-700 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            🔍 Track Issue
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;