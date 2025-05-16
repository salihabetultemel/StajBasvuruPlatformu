'use client';

import { useEffect, useState } from 'react';

const PrivacyModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('privacyAccepted');
    if (!accepted) {
      setShowModal(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacyAccepted', 'true');
    setShowModal(false);
  };

  return showModal ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 max-w-lg w-full shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
          Aydınlatma Metni Onayı
        </h2>
        <p className="text-sm text-black dark:text-gray-300 mb-4">
          Bu platformu kullanabilmeniz için kişisel verilerinizin aydınlatma metnine uygun olarak işlenmesini kabul etmeniz gerekmektedir.
        </p>
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm mb-4 block"
        >
          Aydınlatma Metnini Görüntüle
        </a>
        <button
          onClick={handleAccept}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Kabul Ediyorum
        </button>
      </div>
    </div>
  ) : null;
};

export default PrivacyModal;
