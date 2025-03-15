import { defineEventHandler, readBody } from "h3";
import getPool from "@/server/db/connection";

export default defineEventHandler(async (event) => {
  const pool = getPool();
  const method = event.node.req.method;

  //게시글 모든 조회
  if (method === "GET") {
    const [rows] = await pool.query(
      "SELECT * FROM posts WHERE delYn = false ORDER BY createdAt DESC"
    );

    return { success: true, posts: rows };
  }

  //게시글 등록
  if (method === "POST") {
    const body = await readBody(event);
    const { title, content, images } = body;

    if (!title || !content) {
      return { success: false, error: "Title and content are required" };
    }

    const jsonImages = JSON.stringify(images || []);

    const [result] = await pool.query(
      "INSERT INTO posts (title, content, images) VALUES (?, ?, ?)",
      [title, content, jsonImages]
    );

    return { success: true, message: "Post added" };
  }

  return { success: false, error: "Method not supported" };
});
