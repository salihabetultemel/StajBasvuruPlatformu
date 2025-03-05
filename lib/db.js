import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // .env dosyasını yükle

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // .env'den veritabanı bilgisi al
});

export default pool;
