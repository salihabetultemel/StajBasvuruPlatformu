"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../../../components/navbar"; // ✅ Eklendi
import SidebarMenu from "../../../components/sidebarmenu"; // ✅ Eklendi


type UserProfile = {
  username: string;
  email: string;
  ogrenciNo: string;
  tcKimlik: string;
  bolum: string;
  sinif: string;
  profilResmi?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tcKimlik, setTcKimlik] = useState("");
  const [bolum, setBolum] = useState("");
  const [sinif, setSinif] = useState("");
  const [progress, setProgress] = useState(0);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);


  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setTcKimlik(data.tcKimlik || "");
        setBolum(data.bolum || "");
        setSinif(data.sinif || "");
      });
  }, []);

  useEffect(() => {
    const fieldsFilled = [tcKimlik, bolum, sinif].filter((val) => val.trim() !== "").length;
    setProgress(Math.round((fieldsFilled / 3) * 100));
  }, [tcKimlik, bolum, sinif]);

  const handleSave = async () => {
    if (!user) return;

    const res = await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        tcKimlik,
        bolum,
        sinif,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Profil güncellendi!");
    } else {
      alert("❌ Güncelleme hatası: " + data.message);
    }
  };

  if (!user) return <div className="text-center p-10 text-white">Yükleniyor...</div>;

  const profilePicture = user.profilResmi || "/defaultprofilepicture.jpg";

  return (
    <>
    <Navbar toggleSidebar={toggleSidebar} />
    <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

    <div className="min-h-screen bg-gradient-to-br from-[#1f1c2c] via-[#302b63] to-[#24243e] pt-24 px-4">
      
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl text-black space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Profil Bilgilerim</h1>
          <p className="text-sm text-gray-500">Aşağıdaki bilgileri güncelleyebilirsiniz.</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 relative rounded-full overflow-hidden border-4 border-blue-200 shadow-md">
            <Image
              src={profilePicture}
              alt="Profil"
              fill
              className="object-cover rounded-full"
            />
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const fileInput = form.elements.namedItem("profile") as HTMLInputElement;
              if (!fileInput?.files?.length || !user) return;

              const formData = new FormData();
              formData.append("file", fileInput.files[0]);
              formData.append("email", user.email.toLowerCase());

              const res = await fetch("/api/user/upload", {
                method: "POST",
                body: formData,
              });

              const data = await res.json();
              if (res.ok) {
                alert("Fotoğraf yüklendi!");
                window.location.reload();
              } else {
                alert("Yükleme hatası: " + data.message);
              }
            }}
            className="flex flex-col items-center gap-2"
          >
            <label
              htmlFor="profile"
              className="cursor-pointer bg-gray-100 px-4 py-2 rounded border text-sm hover:bg-gray-200"
            >
              Dosya Seç
              <input type="file" name="profile" id="profile" accept="image/*" className="hidden" />
            </label>
            <button
              type="submit"
              className="bg-purple-600 text-white text-sm px-4 py-1 rounded hover:bg-purple-700"
            >
              Fotoğraf Yükle
            </button>
          </form>
        </div>

        {/* Form Alanları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Ad Soyad</label>
            <input
              type="text"
              value={user.username}
              disabled
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">E-posta</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Okul Numarası</label>
            <input
              type="text"
              value={user.ogrenciNo}
              disabled
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">T.C. Kimlik No</label>
            <input
              type="text"
              value={tcKimlik}
              onChange={(e) => setTcKimlik(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Bölüm</label>
            <input
              type="text"
              value={bolum}
              onChange={(e) => setBolum(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Sınıf</label>
            <input
              type="text"
              value={sinif}
              onChange={(e) => setSinif(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Kaydet
          </button>
        </div>

        <div className="w-full mt-6">
          <div className="flex justify-between items-center mb-1 px-1">
            <span className="text-sm font-medium text-gray-700">Tamamlanma Durumu</span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-in-out rounded-full`}
              style={{
                width: `${progress}%`,
                backgroundImage:
                  progress === 100
                    ? "linear-gradient(to right, #16a34a, #22c55e)"
                    : "linear-gradient(to right, #6366f1, #a855f7)",
              }}
            ></div>
          </div>

          {progress === 100 && (
            <p className="text-green-600 mt-3 text-center font-semibold">
              🎉 Tebrikler! Profiliniz tamamen hazır.
            </p>
          )}
        </div>
      </div>
    </div>
     </>
  );
}
