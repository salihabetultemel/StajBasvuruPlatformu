"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ogrenciNo, setOgrenciNo] = useState("");
  const [adSoyad, setAdSoyad] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    setError("");

    if (ogrenciNo.length !== 12) {
      setError("Okul numarası 12 haneli olmalıdır.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, ogrenciNo, adSoyad }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/login");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-black bg-gray-100">
      <div className="p-6 rounded-lg shadow-md bg-white w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h1>
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-1">Ad Soyad</label>
          <input
            type="text"
            value={adSoyad}
            onChange={(e) => setAdSoyad(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-1">Okul Numarası</label>
          <input
            type="text"
            value={ogrenciNo}
            onChange={(e) => setOgrenciNo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            maxLength={12}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-1">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-1">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
        >
          Kayıt Ol
        </button>
      </div>
    </div>
  );
}
