"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { UserButton, useUser } from "@clerk/nextjs";
import { FC } from "react";

const Navbar: FC = () => {
  const { user } = useUser();
  return (
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
            <p>Features</p>
          </Link>
          <Link href="/pricing">
            <p>Pricing</p>
          </Link>
          <Link href="/contact">
            <p>Contact</p>
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
            <p className="back text-white px-4 py-2 rounded-xl">Get Started</p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
