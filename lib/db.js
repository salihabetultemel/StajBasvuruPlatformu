import { Pool } from "pg";

const pool = new Pool({
  user: "postgres", // PostgreSQL kullanıcı adın
  host: "localhost", // Veritabanı sunucusu (genellikle localhost)
  database: "StajBasvuruPlatformu", // Veritabanı adı
  password: "yourpassword", // PostgreSQL şifren
  port: 5432, // PostgreSQL varsayılan portu
});

export default pool;
