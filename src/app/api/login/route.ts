import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "../../../../lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Kullanıcıyı veritabanında ara
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return NextResponse.json({ message: "E-posta veya şifre hatalı." }, { status: 401 });
    }

    // Şifre doğrulama
    const isValid = await bcrypt.compare(password, user.rows[0].password);

    if (!isValid) {
      return NextResponse.json({ message: "E-posta veya şifre hatalı." }, { status: 401 });
    }

    return NextResponse.json({ message: "Giriş başarılı!" }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Bir hata oluştu." }, { status: 500 });
  }
}
