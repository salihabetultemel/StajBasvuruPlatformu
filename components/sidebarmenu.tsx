"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { User, Info, LogOut, Sun, Moon, MessageSquare,Home  } from "lucide-react";

export type SidebarMenuProps = {
  isOpen: boolean;
  toggleSidebar: () => void; // diğer sayfalar uyumlu kalabilsin diye burada bırakıyoruz
};

const SidebarMenu: React.FC<SidebarMenuProps> = (props) => {
  const { isOpen } = props; // sadece isOpen kullanılıyor, toggleSidebar kullanılmadığı için destructure edilmiyor

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
              href="/home"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1e293b] hover:text-white transition"
            >
              <Home className="w-5 h-5" /> Anasayfa
            </a>
            </li>
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
          <li>
            <a
              href="/feedback"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1e293b] hover:text-white transition"
            >
              <MessageSquare className="w-5 h-5" /> Geri Bildirim
            </a>
          </li>
        </ul>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div className="flex flex-col items-center pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                localStorage.setItem("theme", "light");
                setIsDark(false);
                document.documentElement.classList.remove("dark");
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition ${!isDark ? "bg-white text-yellow-500" : "text-gray-400"
                }`}
            >
              <Sun className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                localStorage.setItem("theme", "dark");
                setIsDark(true);
                document.documentElement.classList.add("dark");
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition ${isDark ? "bg-white text-black" : "text-gray-400"
                }`}
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>


          <p className="text-xs text-gray-400 mt-2">
            {isDark ? "Karanlık Mod" : "Aydınlık Mod"}
          </p>

          <div className="border-t-2 border-[#a5adba] w-full my-4" />

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 p-2 text-red-400 hover:text-red-200 hover:bg-[#1e293b] rounded-md transition"
          >
            <LogOut className="w-5 h-5" /> Oturumu Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
