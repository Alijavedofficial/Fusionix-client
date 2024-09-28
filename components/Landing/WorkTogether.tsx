import { FC } from 'react';
import Link from 'next/link';

const WorkTogetherSection: FC = () => {
  return (
    <section className="text-white space-y-8 flex flex-col items-center justify-center flex-1 text-center w-full p-4 py-20 back shadow-md rounded-xl border border-gray-300">
      <h1 className="text-5xl font-medium">
        A Better Way to Work <br /> Today, Together
      </h1>
      <p className="text-lg text-gray-400 max-w-2xl">
        Our platform allows YouTubers and editors to work together efficiently. Share ideas, manage projects, and create amazing content with ease.
      </p>
      <div className="flex space-x-4">
        <Link href="/get-started">
          <p className="bg-white text-black px-6 py-2 rounded-xl text-lg hover:bg-opacity-80">
            Get Started
          </p>
        </Link>
        <Link href="/learn-more">
          <p className="px-6 py-2 rounded-xl border border-gray-700 text-lg bg-[#212529]">
            Learn More
          </p>
        </Link>
      </div>
    </section>
  );
};

export default WorkTogetherSection;
