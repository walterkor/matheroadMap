import { defineEventHandler, readBody } from "h3";
import pool from "@/server/db/connection";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "GET") {
    // 방명록 조회
    const [rows] = await pool.query(
      "SELECT * FROM guestbook ORDER BY created_at DESC"
    );
    return { success: true, guestbook: rows };
  }

  if (method === "POST") {
    // 방명록 추가
    const body = await readBody(event);
    const { name, message } = body;

    if (!name || !message) {
      return { success: false, error: "Name and message are required" };
    }

    await pool.query("INSERT INTO guestbook (name, message) VALUES (?, ?)", [
      name,
      message,
    ]);
    return { success: true, message: "Entry added" };
  }

  if (method === "DELETE") {
    // 방명록 삭제
    const body = await readBody(event);
    const { id } = body;

    if (!id) {
      return { success: false, error: "ID is required" };
    }

    await pool.query("DELETE FROM guestbook WHERE id = ?", [id]);
    return { success: true, message: `Entry with id ${id} deleted` };
  }

  return { success: false, error: "Method not supported" };
});
