import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "../../../../lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Kullanıcının zaten kayıtlı olup olmadığını kontrol et
    const client = await pool.connect();
    const existingUser = await client.query("SELECT * FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length > 0) {
      client.release();
      return NextResponse.json({ message: "Bu e-posta zaten kayıtlı." }, { status: 400 });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcıyı veritabanına ekle
    await client.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword]);

    client.release();
    return NextResponse.json({ message: "Kayıt başarılı!" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Bir hata oluştu." }, { status: 500 });
  }
}
