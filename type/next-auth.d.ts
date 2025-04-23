import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string; // ✅ Profil fotoğrafı desteği
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    image?: string;
  }
}
