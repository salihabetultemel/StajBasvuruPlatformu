import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "../../../../lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const client = await pool.connect();
    const user = await client.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      client.release();
      return NextResponse.json({ message: "E-posta veya şifre hatalı." }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.rows[0].password);
    client.release();

    if (!isValid) {
      return NextResponse.json({ message: "E-posta veya şifre hatalı." }, { status: 401 });
    }

    return NextResponse.json({ message: "Giriş başarılı!" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Bir hata oluştu." }, { status: 500 });
  }
}
