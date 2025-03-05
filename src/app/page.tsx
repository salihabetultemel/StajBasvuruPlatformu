"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/home"); // Başarılı giriş sonrası yönlendirme
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-black bg-gray-100">
      <div className="p-6 rounded-lg shadow-md text-black bg-white w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Giriş Yap</h1>
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-1">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-postanızı girin"
            className="w-full p-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-1">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifrenizi girin"
            className="w-full p-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Giriş Yap
        </button>

        <p className="mt-4 text-center text-sm text-black">
          Hesabın yok mu?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Kayıt Ol
          </a>
        </p>
      </div>
    </div>
  );
}
