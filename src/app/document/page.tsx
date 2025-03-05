"use client";

import Navbar from "../../../components/navbar";
import { useState } from "react";
import SidebarMenu from "../../../components/sidebarmenu";

export default function DocumentPage() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Sayfanın yenilenmesini önler
      console.log("Form gönderildi!");
    };
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
    
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        {/* Sidebar Menu */}
      <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Navbar */}
      <div className="bg-gray-900 bg-opacity-95 fixed top-0 left-0 w-full z-50 shadow-lg">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>
        <h1 className="text-2xl font-bold mb-4">Belge Oluştur</h1>
        <form
          onSubmit={handleSubmit} // onSubmit event'ini tanımladık
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <label className="block mb-2 font-medium">Başlangıç Tarihi:</label>
          <input type="date" className="w-full p-2 border rounded mb-4" />
  
          <label className="block mb-2 font-medium">Bitiş Tarihi:</label>
          <input type="date" className="w-full p-2 border rounded mb-4" />
  
          <label className="block mb-2 font-medium flex items-center">
            <input type="checkbox" className="mr-2" /> Ücretli
          </label>
  
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded mt-4 hover:bg-purple-800 transition"
          >
            PDF Oluştur
          </button>
        </form>
      </div>
    );
  }
  