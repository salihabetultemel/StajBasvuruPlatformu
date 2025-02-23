import React from 'react';

type NavbarProps = {
  toggleSidebar: () => void; // Sidebar'ı açıp kapatma fonksiyonu
  user?: {
    username: string;
    profilePicture?: string; // Profil resmi opsiyonel
  };
};

const Navbar = ({ toggleSidebar, user }: NavbarProps) => {
  const defaultProfilePicture = '/defaultprofilepicture.jpg'; // Varsayılan profil görseli

  return (
    <div className="flex h-20 bg-gray-800 items-center justify-between px-10">
      {/* Sidebar Tetikleme Butonu */}
      <button
        className="p-2 bg-[#364193] text-white rounded-full shadow-lg focus:outline-none"
        onClick={toggleSidebar}
      >
        <span className="block w-6 h-1 bg-white mb-1"></span>
        <span className="block w-6 h-1 bg-white mb-1"></span>
        <span className="block w-6 h-1 bg-white "></span>
      </button>

      {/* Başlık */}
      <div className="text-lg text-white font-semibold absolute left-1/2 transform -translate-x-1/2">
        STAJ BAŞVURU PLATFORMU
      </div>

      {/* Sağ Taraf: Profil Alanı */}
      <div className="absolute right-8 flex items-center space-x-4">
        {user ? (
          <>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white">
              <img
                src={user.profilePicture || defaultProfilePicture}
                alt="Profil"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-medium">{user.username}</span>
          </>
        ) : (
          <a href="/login" className="text-white font-medium hover:text-blue-300">
            Profil
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
