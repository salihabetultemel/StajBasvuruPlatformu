import { NextResponse } from "next/server";
import pool from "../../../../../lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, tcKimlik, bolum, sinif } = body;

  if (!email) {
    return NextResponse.json({ message: "Email zorunludur." }, { status: 400 });
  }

  try {
    await pool.query(
      `UPDATE users SET 
        tc_kimlik_no = $1, 
        bolum = $2, 
        sinif = $3 
       WHERE email = $4`,
      [tcKimlik, bolum, sinif, email]
    );

    return NextResponse.json({ message: "Profil güncellendi." });
  } catch (error) {
    console.error("Güncelleme hatası:", error);
    return NextResponse.json({ message: "Bir hata oluştu." }, { status: 500 });
  }
}
