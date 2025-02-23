import React from 'react';

// SidebarMenu Props
type SidebarMenuProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 z-40`} // z-40 ensures sidebar stays behind navbar
      >
        <div className="p-4 mt-7 font-bold text-lg">Menü</div>
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <a href="/profilepage">Profil Bilgilerim</a>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <a href="/about">Hakkımızda</a>
          </li>
        </ul>
      </div>

      {/* Menu Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-full shadow-lg focus:outline-none"
        onClick={toggleSidebar}
      >
        <span className="block w-6 h-1 bg-white mb-1"></span>
        <span className="block w-6 h-1 bg-white mb-1"></span>
        <span className="block w-6 h-1 bg-white"></span>
      </button>
    </>
  );
};

export default SidebarMenu;
