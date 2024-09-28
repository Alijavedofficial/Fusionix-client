import Link from 'next/link';
import { Icon } from '@iconify/react'; 
import Image from 'next/image';
import DashboardImage from '../../public/dashboard.png';
import { FC } from 'react';
import { BackgroundBeams } from '../ui/background-beams';

const HeroSection: FC = () => {
  return (
    <section className="relative text-white space-y-8 h-screen flex flex-col items-center justify-center flex-1 text-center w-full p-4 py-20 back shadow-md rounded-xl border border-gray-300">
      {/* Heading */}
      <span className="flex gap-3 p-1 pl-3 pr-2 text-sm border border-gray-700 rounded-xl items-center bg-[#212529]">
        <p>Discover all new Fusionix</p>
        <div className="p-1.5 px-2 bg-[#343a40] rounded-lg">
          <Icon icon="solar:arrow-right-linear" style={{ fontSize: '14px' }} />
        </div>
      </span>
      <h1 className="text-6xl font-semibold">
        One Tool For Doing it <br /> All Together
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-400 max-w-2xl">
        Our platform allows YouTubers and editors to work together efficiently. Share ideas, manage projects, and create amazing content with ease.
      </p>

      {/* Action Buttons */}
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
      
      <div className="p-4 rounded-xl border border-gray-700 bg-[#212529]">
        <Image
          alt="dashboard"
          width={999}
          height={300}
          src={DashboardImage} // Ensure the image path is correct
          className="rounded-xl h-[550px]"
        />
      </div>
       {/* <BackgroundBeams /> */}
    </section>
  );
};

export default HeroSection;
