import mysql from "mysql2/promise";
import dotenv from "dotenv";

// .env 파일을 명시적으로 불러오기
dotenv.config({ path: ".env" });

// MySQL 연결 풀 생성
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 연결 테스트
pool
  .getConnection()
  .then((conn) => {
    console.log("✅ MySQL 연결 성공! 🛢️");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ MySQL 연결 실패:", err.message);
  });

export default pool;
