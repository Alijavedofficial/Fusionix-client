import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-5 bg-white shadow-md">
        <div className="text-xl font-bold">
          {/* Logo */}
          <Link href="/">
            <p className="text-blue-600">YT Collaboration</p>
          </Link>
        </div>
        <div className="flex space-x-4">
          {/* Navbar items */}
          <Link href="/features">
            <p className="text-gray-600 hover:text-blue-600">Features</p>
          </Link>
          <Link href="/pricing">
            <p className="text-gray-600 hover:text-blue-600">Pricing</p>
          </Link>
          <Link href="/contact">
            <p className="text-gray-600 hover:text-blue-600">Contact</p>
          </Link>
        </div>
        <div className="flex space-x-4">
          {/* Sign In and Sign Up buttons */}
          <Link href="/sign-in">
            <p className="text-gray-600 hover:text-blue-600">Sign In</p>
          </Link>
          <Link href="/sign-up">
            <p className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</p>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 text-center mt-10">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-900">
          Collaborate Seamlessly with Your Team
        </h1>

        {/* Description */}
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Our platform allows YouTubers and editors to work together efficiently.
          Share ideas, manage projects, and create amazing content with ease.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <Link href="/get-started">
            <p className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700">
              Get Started
            </p>
          </Link>
          <Link href="/learn-more">
            <p className="text-blue-600 border border-blue-600 px-6 py-3 rounded-md text-lg hover:bg-blue-100">
              Learn More
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
