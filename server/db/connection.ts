import mysql from "mysql2/promise";
import dotenv from "dotenv";

// .env 파일 로드
dotenv.config({ path: ".env" });

// MySQL Pool 생성 (싱글톤 패턴 적용)
let pool: mysql.Pool;

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      multipleStatements: true,
    });
    console.log("✅ MySQL Pool 생성 완료!");
  } else {
    console.log("✅ 기존 Pool 사용!");
  }
  return pool;
};

// 연결 테스트
(async () => {
  try {
    const testConn = await getPool().getConnection();
    console.log("✅ MySQL 연결 성공! 🛢️");

    testConn.release();
  } catch (err: any) {
    console.error("❌ MySQL 연결 실패:", err.message);
  }
})();

export default getPool;
