import React from 'react';

type NavbarProps = {
  toggleSidebar: () => void;
  user?: {
    username: string;
    profilePicture?: string;
  };
};

const Navbar = ({ toggleSidebar, user }: NavbarProps) => {
  const defaultProfilePicture = '/defaultprofilepicture.jpg';

  return (
    <div className="flex h-20 items-center justify-between px-10 bg-gray-800">
      {/* Sidebar Butonu */}
      <button
        className="p-2 text-white rounded-full focus:outline-none"
        onClick={toggleSidebar}
      >
        <span className="block w-6 h-1 bg-white mb-1"></span>
        <span className="block w-6 h-1 bg-white mb-1"></span>
        <span className="block w-6 h-1 bg-white"></span>
      </button>

      {/* Başlık */}
      <div className="text-lg text-white font-bold absolute left-1/2 transform -translate-x-1/2">
        STAJ BAŞVURU PLATFORMU
      </div>

      {/* Profil */}
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
