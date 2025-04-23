import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const email = formData.get("email") as string;

  if (!file || !email) {
    return NextResponse.json({ message: "Dosya veya kullanıcı eksik." }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}_${file.name}`;
  const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

  await writeFile(uploadPath, buffer);

  // Veritabanında güncelle
  const pool = (await import("../../../../../lib/db")).default;
  await pool.query("UPDATE users SET profil_resmi = $1 WHERE email = $2", [`/uploads/${fileName}`, email]);

  const result = await pool.query(
    "UPDATE users SET profil_resmi = $1 WHERE email = $2",
    [`/uploads/${fileName}`, email]
  );
  
  console.log("Email:", email);
  console.log("Dosya yolu:", `/uploads/${fileName}`);
  console.log("Güncellenen satır sayısı:", result.rowCount);
  
  return NextResponse.json({ message: "Yüklendi", path: `/uploads/${fileName}` });

  
}


