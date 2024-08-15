"use client";
import React from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Icon } from "@iconify/react";
import { BackgroundBeams } from "../../components/ui/background-beams";
import Image from "next/image";
import DashboardImage from "../../public/dashboard.png";
import image1 from "../../public/image1.svg";
import image2 from "../../public/image2.svg";
import image3 from "../../public/image3.svg";
import image4 from "../../public/image4.svg";

const HomePage: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col items-center p-5 gap-5">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-4 px-6 bg-white shadow-md rounded-xl border border-gray-300">
        <div className="flex justify-center items-center gap-16">
          {/* Logo */}
          <Link href="/">
            <span className="flex items-center gap-2 font-medium text-xl">
              <Icon icon="bi:box" className="" style={{ fontSize: "18px" }} />
              <p className="text-black">Fusionix</p>
            </span>
          </Link>
          <div className="flex space-x-6">
            {/* Navbar items */}
            <Link href="/features">
              <p className=" ">Features</p>
            </Link>
            <Link href="/pricing">
              <p className="">Pricing</p>
            </Link>
            <Link href="/contact">
              <p className="">Contact</p>
            </Link>
          </div>
        </div>
        {user ? (
          <UserButton />
        ) : (
          <div className="flex space-x-4 items-center">
            {/* Sign In and Sign Up buttons */}
            <Link href="/sign-in">
              <p className="border border-gray-300 rounded-xl p-2">Sign In</p>
            </Link>
            <Link href="/sign-up">
              <p className="back text-white px-4 py-2 rounded-xl">
                Get Started
              </p>
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <section className="relative text-white space-y-8 h-screen flex flex-col items-center justify-center flex-1 text-center w-full p-4 py-20 back shadow-md rounded-xl border border-gray-300">
        {/* Heading */}
        <span className="flex gap-3 p-1 pl-3 pr-2 text-sm border border-gray-700 rounded-xl items-center bg-[#212529]">
          <p>Discover all new Fusionix</p>
          <div className="p-1.5 px-2 bg-[#343a40] rounded-lg">
            <Icon
              icon="solar:arrow-right-linear"
              className=""
              style={{ fontSize: "14px" }}
            />
          </div>
        </span>
        <h1 className="text-6xl font-semibold">
          One Tool For Doing it <br></br> All Together
        </h1>

        {/* Description */}
        <p className=" text-lg text-gray-400 max-w-2xl">
          Our platform allows YouTubers and editors to work together
          efficiently. Share ideas, manage projects, and create amazing content
          with ease.
        </p>

        {/* Action Buttons */}
        <div className=" flex space-x-4">
          <Link href="/get-started">
            <p className="bg-white text-black px-6 py-2 rounded-xl text-lg hover:bg-opacity-80">
              Get Started
            </p>
          </Link>
          <Link href="/learn-more">
            <p className="px-6 py-2 rounded-xl border border-gray-700 text-lg  bg-[#212529]">
              Learn More
            </p>
          </Link>
        </div>
        <div className="p-4 rounded-xl border border-gray-700  bg-[#212529]">
          <Image
            alt="dashboard"
            width={999}
            height={300}
            src={DashboardImage}
            className="rounded-xl h-[550px]"
          />
        </div>
        {/* <BackgroundBeams /> */}
      </section>

      <section className="p-20 bg-white shadow-md rounded-xl border border-gray-300 items-start w-full">
        <div className="flex flex-col gap-10">
          <p className="border border-gray-300 flex gap-2 items-center rounded-xl p-2 px-3 w-28 h-auto text-gray-600 text-sm">
            <span>
              <Icon icon="bi:box" className="" style={{ fontSize: "15px" }} />
            </span>
            Features
          </p>
          <h1 className="text-4xl font-semibold">
            Everything Your Team Looking For
          </h1>
          <p className="text-gray-600">
            SuperCharge Productivity. Streamline work by doing it under one
            platform
          </p>
          <div className="grid grid-cols-2">
            <div className="flex items-start gap-5 flex-col pb-10">
              <div className="p-4 bg-white border border-gray-300 rounded-xl">
                <Image
                  alt="dashboard"
                  width={500}
                  height={200}
                  src={image1}
                  className="rounded-xl h-[250px] w-[500px] object-fill"
                />
              </div>
              <span className="flex gap-2 items-center font-semibold text-xl">
                <Icon icon="bi:box" style={{ fontSize: "18px" }} />
                <h2>Project Management</h2>
              </span>
              <p className="pr-20 text-gray-500">
                Manage your projects from start to finish. With your workspaces,
                you can add your editors in the workspace
              </p>
            </div>
            <div className="flex items-start gap-5 flex-col">
              <div className="p-4 bg-white border border-gray-300 rounded-xl">
                <Image
                  alt="dashboard"
                  width={500}
                  height={200}
                  src={image2}
                  className="rounded-xl h-[250px] w-[500px] object-fill"
                />
              </div>
              <span className="flex gap-2 items-center font-semibold text-xl">
                <Icon icon="bi:box" style={{ fontSize: "18px" }} />
                <h2>Project Management</h2>
              </span>
              <p className="pr-20 text-gray-500">
                Manage your projects from start to finish. With your workspaces,
                you can add your editors in the workspace
              </p>
            </div>
            <div className="flex items-start gap-5 flex-col">
              <div className="p-4 bg-white border border-gray-300 rounded-xl">
                <Image
                  alt="dashboard"
                  width={500}
                  height={200}
                  src={image3}
                  className="rounded-xl h-[250px] w-[500px] object-fill"
                />
              </div>
              <span className="flex gap-2 items-center font-semibold text-xl">
                <Icon icon="bi:box" style={{ fontSize: "18px" }} />
                <h2>Project Management</h2>
              </span>
              <p className="pr-20 text-gray-500">
                Manage your projects from start to finish. With your workspaces,
                you can add your editors in the workspace
              </p>
            </div>
            <div className="flex items-start gap-5 flex-col">
              <div className="p-4 bg-white border border-gray-300 rounded-xl">
                <Image
                  alt="dashboard"
                  width={500}
                  height={200}
                  src={image4}
                  className="rounded-xl h-[250px] w-[500px] object-fill"
                />
              </div>
              <span className="flex gap-2 items-center font-semibold text-xl">
                <Icon icon="bi:box" style={{ fontSize: "18px" }} />
                <h2>Project Management</h2>
              </span>
              <p className="pr- text-gray-500">
                Manage your projects from start to finish. With your workspaces,
                you can add your editors in the workspace
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className=" text-white space-y-8 flex flex-col items-center justify-center flex-1 text-center w-full p-4 py-20 back shadow-md rounded-xl border border-gray-300">
        <h1 className="text-5xl font-medium">
          A Better Way to Work <br></br> Today, Together
        </h1>
        <p className=" text-lg text-gray-400 max-w-2xl">
          Our platform allows YouTubers and editors to work together
          efficiently. Share ideas, manage projects, and create amazing content
          with ease.
        </p>
        <div className=" flex space-x-4">
          <Link href="/get-started">
            <p className="bg-white text-black px-6 py-2 rounded-xl text-lg hover:bg-opacity-80">
              Get Started
            </p>
          </Link>
          <Link href="/learn-more">
            <p className="px-6 py-2 rounded-xl border border-gray-700 text-lg  bg-[#212529]">
              Learn More
            </p>
          </Link>
        </div>
      </section>

      <section className="p-20 bg-white shadow-md rounded-xl border border-gray-300 items-start w-full">
        <div className="flex flex-col gap-10">
          <p className="border border-gray-300 flex gap-2 items-center rounded-xl p-2 px-3 w-36 h-auto text-gray-600 text-sm">
            <span>
              <Icon icon="bi:box" className="" style={{ fontSize: "15px" }} />
            </span>
            Why Fusionix
          </p>
          <h1 className="text-4xl font-semibold">
            Increase Productivity <br></br> and Save Time
          </h1>
          <p className="text-gray-600">
            SuperCharge Productivity. Streamline work by doing it under one
            platform
          </p>
          <div className="flex gap-5 justify-between">
            <div className="flex flex-col gap-2 p-8 rounded-xl border border-gray-300 items-start flex-1">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Icon
                  icon="mdi:account-multiple-plus"
                  className="text-white"
                  style={{ fontSize: "26px" }}
                />
              </div>
              <h1 className="font-medium text-xl pt-4">Add Editors</h1>
              <p className="text-gray-600 text-sm">
                Easily add editors to your workspace and manage their roles to
                collaborate on video projects.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-8 rounded-xl border border-gray-300 items-start flex-1">
              <div className="p-3 bg-blue-400 rounded-xl">
                <Icon
                  icon="mdi:youtube"
                  className="text-white"
                  style={{ fontSize: "26px" }}
                />
              </div>
              <h1 className="font-medium text-xl pt-4">Upload & Review</h1>
              <p className="text-gray-600 text-sm">
                Upload videos, collaborate with editors, and review content
                before it goes live on YouTube.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-8 rounded-xl border border-gray-300 items-start flex-1">
              <div className="p-3 bg-green-400 rounded-xl">
                <Icon
                  icon="mdi:approve"
                  className="text-white"
                  style={{ fontSize: "26px" }}
                />
              </div>
              <h1 className="font-medium text-xl pt-4">Approval & Publish</h1>
              <p className="text-gray-600 text-sm">
                Approve finalized videos and let our platform automatically
                publish them to your YouTube channel.
              </p>
            </div>
          </div>
        </div>
      </section>

       <section className="flex flex-col gap-10 text-white space-y-8 items-start justify-center flex-1 w-full p-20 back shadow-md rounded-xl border border-gray-300">
        <div className="flex flex-col gap-4"> 
          <p className="border  flex gap-2 p-2 px-3 w-24 h-auto  text-sm border-gray-700 rounded-xl items-center bg-[#212529]">
            <span>
              <Icon icon="fluent:wallet-credit-card-16-regular" className="" style={{ fontSize: "15px" }} />
            </span>
            Pricing
          </p>
          <h1 className="text-5xl font-semibold">
            Simple and Flexible <br></br> Pricing
          </h1>
          </div>
          <div className="flex justify-between w-full">
             <div className="border border-gray-700 rounded-xl bg-[#212529] flex flex-col justify-between text-sm p-4 px-10">
             <p className="text-gray-400 text-lg">Starter</p>
              <div className="pricing-border py-4">  
              <h1 className="text-4xl font-semibold">$0 <span className="text-[16px] font-normal text-gray-400">per month</span></h1>
              <p className="text-gray-400 font-light">For inviduals with one youtube channel and 1 editors</p>
              </div>
              <h6 className="py-4">This Plan Includes:</h6>
              <div className="space-y-4 pb-8">
              <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="" style={{ fontSize: "15px" }} />
                <p className="text-gray-400 font-normal">Auto Upload</p>
              </div>
               <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="" style={{ fontSize: "15px" }} />
                <p className="text-gray-400 font-normal">Collaborations</p>
              </div>
               <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="" style={{ fontSize: "15px" }} />
                <p className="text-gray-400 font-normal">Permissions</p>
              </div>
               <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="" style={{ fontSize: "15px" }} />
                <p className="text-gray-400 font-normal">1 Workspace</p>
              </div>
               <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="" style={{ fontSize: "15px" }} />
                <p className="text-gray-400 font-normal">1 Editor</p>
              </div>
              </div>
              <button className="px-6 py-2 rounded-xl border border-gray-700 text-lg  bg-[#343a40]">Get started</button>
             </div>


             <div className="border border-gray-700 rounded-xl bg-[#fff] flex flex-col justify-between text-sm p-4 px-10">
             <p className="text-black text-lg">Personal</p>
              <div className="pricing-border py-4">  
              <h1 className="text-4xl font-semibold text-black">$10 <span className="text-[16px] font-normal text-black">per month</span></h1>
              <p className="text-black font-light">For inviduals with one youtube channel and 1 editors</p>
              </div>

              <h6 className="py-4 text-black">This Plan Includes:</h6>
              <div className="space-y-4 pb-8">
              <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="text-black" style={{ fontSize: "15px" }} />
                <p className="text-black font-normal">Auto Upload</p>
              </div>
               <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="text-black" style={{ fontSize: "15px" }} />
                <p className="text-black font-normal">Collaborations</p>
              </div>
               <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="text-black" style={{ fontSize: "15px" }} />
                <p className="text-black font-normal">Permissions</p>
              </div>
               <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="text-black" style={{ fontSize: "15px" }} />
                <p className="text-black font-normal">3 Workspace</p>
              </div>
               <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="text-black" style={{ fontSize: "15px" }} />
                <p className="text-black font-normal">5 Editor</p>
              </div>
              </div>
              <button className="px-6 py-2 rounded-xl border border-gray-700 text-lg  bg-[#000]">Get started</button>
             </div>


             <div className="border border-gray-700 rounded-xl bg-[#212529] flex flex-col justify-between text-sm p-4 px-10">
             <p className="text-gray-400 text-lg">Proffesional</p>
              <div className="pricing-border py-4">
              <h1 className="text-4xl font-semibold">$25 <span className="text-[16px] font-normal text-gray-400">per month</span></h1>
              <p className="text-gray-400 font-light">For inviduals with one youtube channel and 1 editors</p>
              </div>
              <h6 className="py-4">This Plan Includes:</h6>
              <div className="space-y-4 pb-8">
              <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="" style={{ fontSize: "15px" }} />
                <p className="text-gray-400 font-normal">Auto Upload</p>
              </div>
               <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="" style={{ fontSize: "15px" }} />
                <p className="text-gray-400 font-normal">Collaborations</p>
              </div>
               <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="" style={{ fontSize: "15px" }} />
                <p className="text-gray-400 font-normal">Permissions</p>
              </div>
               <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="" style={{ fontSize: "15px" }} />
                <p className="text-gray-400 font-normal">Unlimited Workspace</p>
              </div>
               <div className="flex items-center gap-3">
                <Icon icon="teenyicons:tick-circle-solid" className="" style={{ fontSize: "15px" }} />
                <p className="text-gray-400 font-normal">Unlimited Editor</p>
              </div>
              </div>
              <button className="px-6 py-2 rounded-xl border border-gray-700 text-lg bg-[#343a40]">Get started</button>
             </div>
          </div>
      </section>
     

      <footer className="flex flex-col text-white space-y-8 w-full p-16 py-12 back shadow-md rounded-xl border border-gray-300">
        <div className="flex w-full justify-between border-b border-gray-800 pb-6 px-6">
          <div className="flex flex-col items-start mb-4 mx-4 text-gray-400">
            <h3 className="font-bold text-white pb-5">Fusionix</h3>
            <div className="flex flex-col gap-4">
              <a href="#" className="">
                Home
              </a>
              <a href="#" className="">
                About Us
              </a>
              <a href="#" className="">
                Services
              </a>
              <a href="#" className="">
                Contact
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start mb-4 mx-4 text-gray-400">
            <h3 className="font-bold text-white pb-5">Solutions</h3>
            <div className="flex flex-col gap-4">
              <a href="#" className="">
                Project Management
              </a>
              <a href="#" className="">
                Workspaces
              </a>
              <a href="#" className="">
                Editors
              </a>
              <a href="#" className="">
                Automate{" "}
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start mb-4 mx-4 text-gray-400">
            <h3 className="font-bold text-white pb-5">Community</h3>
            <div className="flex flex-col gap-4">
              <a href="#" className="">
                Blogs
              </a>
              <a href="#" className="">
                Articles
              </a>
              <a href="#" className="">
                Help Center
              </a>
              <a href="#" className="">
                News
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start mb-4 mx-4 text-gray-400">
            <h3 className="font-bold text-white pb-5">Fusionix for</h3>
            <div className="flex flex-col gap-4">
              <a href="#" className="">
               Commercial
              </a>
              
            </div>
          </div>
          <div className="flex flex-col items-start mb-4 mx-4 text-gray-400">
            <h3 className="font-bold text-white pb-5">Follow Us </h3>
            <div className="flex flex-col gap-4">
              <a href="#" className="">
                Linked In
              </a>
              <a href="#" className="">
                Twitter
              </a>
              <a href="#" className="">
                Instagram
              </a>
              <a href="#" className="">
                Webinar
              </a>
            </div>
          </div>
        </div>

        <div className="text-sm mx-4 text-end text-gray-400 flex justify-between">
        <div className="flex items-center gap-2 font-medium text-xl text-white">
          <Icon icon="bi:box" className="" style={{ fontSize: "20px" }} />
          <p>Fusionix</p>
        </div>
          © 2024 Fusionix. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
