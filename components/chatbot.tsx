"use client";
import { useState } from "react";

// Mesajlar için bir tür tanımlıyoruz
type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]); // Mesajları tutar
  const [userInput, setUserInput] = useState<string>(""); // Kullanıcı girişini tutar

  const handleSendMessage = () => {
    if (userInput.trim() === "") return; // Boş mesaj göndermeyi engelle

    // Kullanıcı mesajını ekle
    const userMessage: Message = { sender: "user", text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Botun cevap vermesi (şimdilik sabit bir cevap)
    const botMessage: Message = {
      sender: "bot",
      text: "Merhaba! Size nasıl yardımcı olabilirim?",
    };
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000); // Bot cevabını 1 saniye gecikmeyle göster

    setUserInput(""); // Kullanıcı girişini sıfırla
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-xl font-bold text-center mb-4">Chatbot</h1>
        <div className="h-64 overflow-y-auto border border-gray-300 rounded-md p-2 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.sender === "user"
                  ? "text-right text-blue-600"
                  : "text-left text-gray-600"
              } mb-2`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-100"
                    : "bg-gray-200"
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1 border border-gray-300 rounded-l-md p-2 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}
