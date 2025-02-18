// BookMark : /api/bookmarks
import { defineEventHandler, readBody } from "h3";
import getPool from "@/server/db/connection";

export default defineEventHandler(async (event) => {
  const pool = getPool();
  const method = event.node.req.method;
  if (method === "GET") {
    // 모든 북마크 조회
    const [rows] = await pool.query("SELECT * FROM bookmarks ORDER BY id DESC");
    return { success: true, bookmarks: rows };
  }

  return "Hello Nitro";
});
