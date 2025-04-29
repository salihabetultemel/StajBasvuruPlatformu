import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions"; // ✅ doğru relative import

import pool from "../../../../lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Oturum bulunamadı." }, { status: 401 });
  }

  const result = await pool.query(
    "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
    [session.user.email]
  );
  const user = result.rows[0];

  if (!user) {
    return NextResponse.json({ message: "Kullanıcı bulunamadı." }, { status: 404 });
  }

  return NextResponse.json({
    username: user.ad_soyad,
    email: user.email,
    ogrenciNo: user.ogrenci_no,
    tcKimlik: user.tc_kimlik_no,
    bolum: user.bolum,
    sinif: user.sinif,
    profilResmi: user.profil_resmi,
  });
}
