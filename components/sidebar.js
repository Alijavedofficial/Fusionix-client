import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function Sidebar({ isOpen, setIsOpen }) {
  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`fixed top-12 shadow- left-0 h-full bg-white transition-width duration-300 ${
        isOpen ? "w-44" : "w-14"
      }`}
    >
      <div className="flex flex-col items-center py-8">
        <div className="flex flex-col">
          <SidebarItem
            icon="material-symbols-light:dashboard-outline"
            text="Dashboard"
            isOpen={isOpen}
            link="/dashboard"
          />
          <SidebarItem
            icon="ph:briefcase-light"
            text="Workspaces"
            isOpen={isOpen}
            link="/workspaces"
          />
          <SidebarItem
            icon="mage:users"
            text="Members"
            isOpen={isOpen}
            link="/members"
          />

        </div>
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, text, isOpen, link }) => {
  return (
    <Link
      href={link}
      passHref
      className="flex items-center p-4 cursor-pointer text-[#505f79] hover:text-[#2684ff] transition"
    >
      <Icon icon={icon} className="" style={{ fontSize: "18px" }} /> &ensp;
      {isOpen && <span>{text}</span>}
    </Link>
  );
};

export default Sidebar;
