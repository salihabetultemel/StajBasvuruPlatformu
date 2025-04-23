"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";

type NavbarProps = {
  toggleSidebar: () => void;
};

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { data: session } = useSession();
  const defaultProfilePicture = "/defaultprofilepicture.jpg";

  const username = session?.user?.name || "Profil";
  const profilePicture = session?.user?.image || defaultProfilePicture;

  return (
    <div className="flex h-20 items-center justify-between px-6 md:px-10 bg-[#0f172a] shadow-lg">
      {/* Sidebar Toggle */}
      <button
        className="p-3 bg-[#1e293b] hover:bg-[#334155] text-white rounded-lg transition flex items-center gap-2"
        onClick={toggleSidebar}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Logo Title */}
      <div className="text-lg text-white font-semibold tracking-wide absolute left-1/2 transform -translate-x-1/2">
        STAJ BAŞVURU PLATFORMU
      </div>

      {/* Profile */}
      <div className="absolute right-6 md:right-10 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-400 shadow-md">
          <img
            src={profilePicture}
            alt="Profil"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-white font-medium hidden md:block">{username}</span>
      </div>
    </div>
  );
};

export default Navbar;