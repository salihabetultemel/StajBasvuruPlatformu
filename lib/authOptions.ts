import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "./db.js"; // ✅ doğru relative path ve uzantılı
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        const result = await pool.query(
          "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
          [email]
        );
        const user = result.rows[0];
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.ad_soyad,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;

        const result = await pool.query(
          "SELECT profil_resmi FROM users WHERE email = $1",
          [user.email]
        );
        const profile = result.rows[0];
        token.image = profile?.profil_resmi || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = typeof token.image === "string" ? token.image : undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
