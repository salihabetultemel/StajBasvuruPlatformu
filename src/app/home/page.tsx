"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../../../components/navbar";
import SidebarMenu from "../../../components/sidebarmenu";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input } as const;
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: input,
      });

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.reply } as const;
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const botMessage = {
        sender: "bot",
        text: "Bir hata oluştu. Lütfen tekrar deneyin.",
      } as const;
      setMessages((prev) => [...prev, botMessage]);
    }

    setInput("");
  };

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] min-h-screen flex">
      <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <div className="bg-[var(--card-bg)] bg-opacity-90 fixed top-0 left-0 w-full z-50 border-b border-[var(--border-color)]">
          <Navbar toggleSidebar={toggleSidebar} />
        </div>

        <div className="w-full max-w-3xl mx-auto mt-28 px-4 pb-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">📄 Staj İşlemleri</h2>
            <p className="mb-4 text-gray-800 dark:text-gray-200">
              Öğrencilerimiz staj başvurularını web sitemiz üzerinden aşağıdaki bağlantıyı kullanarak yapacaklardır. E-posta yoluyla yapılan başvurular değerlendirilmemektedir.
              <br />
              <br />
              Staj yapmadan önce gerekli bilgileri edinmek için Staj Yönergesi ve Staj El Kitabı okunmalıdır.
            </p>
            <ul className="list-disc space-y-3 list-inside text-gray-800 dark:text-gray-200">
              <li>
                Staj hakkında detaylı bilgiler içeren ve staj yapmadan önce okunması gereken Staj El Kitabı için{" "}
                <a href="/staj_belgeleri/StajElKitabi.pdf" target="_blank" className="text-blue-600 underline hover:text-blue-800 transition-colors">tıklayınız</a>.
              </li>
              <li>
                Staj başvurusu yapmak için{" "}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfc0B1OgHNcd0ps9u_EoockVevHoCANh_e0_AZtd9mkzKT2VQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 transition-colors"
                >
                  tıklayınız
                </a>.
              </li>
              <li>
                Staj Yönergesini görüntülemek için{" "}
                <a href="/staj_belgeleri/stajyönergesi.pdf" target="_blank" className="text-blue-600 underline hover:text-blue-800 transition-colors">tıklayınız</a>.
              </li>
              <li>
                Staj zorunluluk belgesini indirmek için{" "}
                <a href="/staj_belgeleri/Stajzorunlulukbelgesi.pdf" target="_blank" className="text-blue-600 underline hover:text-blue-800 transition-colors">tıklayınız</a>.
              </li>
              <li>
                Staj sicil fişi için{" "}
                <a href="/staj_belgeleri/StajSicilFisi.docx" target="_blank" className="text-blue-600 underline hover:text-blue-800 transition-colors">tıklayınız</a>.
              </li>
              <li>
                Staj dosyası oluşturulurken kullanılacak kapak için{" "}
                <a href="/staj_belgeleri/Stajdosyakapagi.docx" target="_blank" className="text-blue-600 underline hover:text-blue-800 transition-colors">tıklayınız</a>.
              </li>
              <li>
                Staj dosyasında kullanılacak sayfalar için{" "}
                <a href="/staj_belgeleri/stajdosyasindakullanilacaksayfalar.docx" target="_blank" className="text-blue-600 underline hover:text-blue-800 transition-colors">tıklayınız</a>.
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full max-w-3xl mx-auto mt-10 px-4 pb-16">
          <details className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
            <summary className="text-lg font-semibold text-[#9f569f] cursor-pointer">
              🤖 Staj ile ilgili sorularınız için Chatbotu kullanabilirsiniz!
            </summary>
            <div className="mt-4 flex flex-col bg-[var(--card-bg)] text-[var(--card-text)] border border-[var(--border-color)] rounded-md p-4">
              <div className="h-[400px] overflow-y-auto space-y-2">
                {!messages.length && (
                  <p className="text-center text-gray-500 dark:text-gray-400">Merhaba! Size nasıl yardımcı olabilirim?</p>
                )}
                {messages.map((msg, i) => (
                  <div key={i} className={`text-white px-3 py-2 rounded ${msg.sender === "user" ? "bg-blue-600 self-end" : "bg-purple-600 self-start"}`}>
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 rounded-md border px-3 py-2 dark:bg-gray-800 dark:text-white"
                  placeholder="Mesajınızı yazın..."
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  Gönder
                </button>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
