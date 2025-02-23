import { defineEventHandler, readBody } from "h3";
import getPool from "@/server/db/connection";

export default defineEventHandler(async (event) => {
  const pool = getPool();
  const method = event.node.req.method;

  //게시글 모든 조회
  if (method === "GET") {
    const [rows] = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );

    // TODO 이미지 파일 변환해야함
    // return rows.map((post) => ({
    //   ...post,
    //   images: post.images ? JSON.parse(post.images) : [],
    // }));
    return { success: true, posts: rows };
  }

  //게시글 등록
  if (method === "POST") {
    const body = await readBody(event);
    const { title, content, images } = body;
    const [result] = await pool.query(
      "INSERT INTO posts (title, content, images) VALUES (?, ?, ?)",
      [title, content, JSON.stringify(images)]
    );

    //return { success: true, id: result.insertId };
    return { success: true };
  }

  //게시글 수정
  if (method === "PUT") {
  }

  return { success: false, error: "Method not supported" };
});
