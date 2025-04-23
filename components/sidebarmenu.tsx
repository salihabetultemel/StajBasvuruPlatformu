"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { Menu, User, Info, LogOut, Sun, Moon } from "lucide-react";

export type SidebarMenuProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, toggleSidebar }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const current = localStorage.getItem("theme");
    setIsDark(current === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full bg-[#0f172a] text-gray-300 shadow-2xl transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } w-64 z-40 flex flex-col justify-between`}
      >
        <div>
          <div className="p-6 text-xl font-bold tracking-wide border-b border-[#1e293b]">
            Menü
          </div>
          <ul className="px-4 py-6 space-y-4">
            <li>
              <a
                href="/profile"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1e293b] hover:text-white transition"
              >
                <User className="w-5 h-5" /> Profil Bilgilerim
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1e293b] hover:text-white transition"
              >
                <Info className="w-5 h-5" /> Hakkımızda
              </a>
            </li>
          </ul>
        </div>

        {/* Alt Kısım */}
        <div className="px-4 py-4 space-y-4">
          {/* 🌗 İnce ve Uzun Toggle */}
          <div className="flex flex-col items-center pt-2">
            <button
              onClick={toggleTheme}
              className={`w-24 h-8 flex items-center rounded-full px-1 transition-colors duration-300 ${isDark ? "bg-indigo-600" : "bg-gray-300"
                }`}
            >
              <div
                className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-white ${isDark
                    ? "translate-x-16 bg-indigo-800"
                    : "translate-x-0 bg-white text-yellow-500"
                  }`}
              >
                {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
            </button>
            <p className="text-xs text-gray-400 mt-2">
              {isDark ? "Karanlık Mod" : "Aydınlık Mod"}
            </p>

            {/* 🔹 Ayırıcı Çizgi */}
            <div className="border-t-2 border-[#a5adba]" />

            {/* 🚪 Oturumu Kapat */}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full flex items-center gap-3 p-2 text-red-400 hover:text-red-200 hover:bg-[#1e293b] rounded-md transition"
            >
              <LogOut className="w-5 h-5" /> Oturumu Kapat
            </button>

          </div>
        </div>
      </div>

      {/* Sidebar Açma Butonu */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-3 bg-[#1e293b] hover:bg-[#334155] text-white rounded-xl shadow-xl focus:outline-none transition"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
};

export default SidebarMenu;
