import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import pool from "../../../../lib/db";

export async function POST(req: Request) {
  try {
    const { email, password, ogrenciNo, adSoyad } = await req.json();

    // Alan kontrolleri
    if (!ogrenciNo || ogrenciNo.length !== 12) {
      return NextResponse.json({ message: "Okul numarası 12 haneli olmalıdır." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [normalizedEmail]);
    if (existingUser.rows.length > 0) {
      return NextResponse.json({ message: "Bu e-posta zaten kayıtlı." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password, ogrenci_no, ad_soyad) VALUES ($1, $2, $3, $4)",
      [normalizedEmail, hashedPassword, ogrenciNo, adSoyad]
    );

    return NextResponse.json({ message: "Kayıt başarılı!" }, { status: 201 });

  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ message: "Bir hata oluştu." }, { status: 500 });
  }
}
