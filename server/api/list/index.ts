import { defineEventHandler, readBody } from "h3";
import getPool from "@/server/db/connection";
export default defineEventHandler(async (event) => {
  const pool = getPool();
  const method = event.node.req.method;

  //최근 게시글 9개 조회
  if (method === "GET") {
    const [rows] = await pool.query(
      `
        SELECT * FROM posts 
        WHERE delYn = false
        ORDER BY createdAt DESC 
        LIMIT 9
      `
    );

    return { success: true, posts: rows };
  }

  return { success: false, error: "Method not supported" };
});
