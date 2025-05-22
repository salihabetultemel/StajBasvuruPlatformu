"use client";

import React from "react";
import { Menu } from "lucide-react";

type NavbarProps = {
  toggleSidebar: () => void;
};

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex h-20 items-center justify-between px-6 md:px-10 bg-[#0f172a] shadow-lg">
      <button
        className="p-3 bg-[#1e293b] hover:bg-[#334155] text-white rounded-lg transition flex items-center gap-2"
        onClick={toggleSidebar}
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="text-lg text-white font-semibold tracking-wide absolute left-1/2 transform -translate-x-1/2">
        STAJ BAŞVURU PLATFORMU
      </div>
    </div>
  );
};

export default Navbar;
