import { defineEventHandler, readBody } from "h3";
import getPool from "@/server/db/connection";

//게시글 삭제
export default defineEventHandler(async (event) => {
  const pool = getPool();
  const method = event.node.req.method;

  if (method === "POST") {
    const body = await readBody(event);
    const { placeId } = body;
    if (!placeId) {
      return { success: false, error: "placeId is required" };
    }

    try {
      const [result] = await pool.query(
        `
          UPDATE posts
            JOIN
              bookmarks ON posts.PlaceId = bookmarks.PlaceId
          SET
            posts.delYn = 0,
            bookmarks.isBookmarked = 0
          WHERE
            posts.PlaceId = ?
        `,
        [placeId]
      );

      return { success: true, message: "Post delPost" };
    } catch (error) {
      console.error("DB Error:", error);
      return { success: false, error: "Database error occurred" };
    }
  }
  return { success: false, error: "Method not supported" };
});
