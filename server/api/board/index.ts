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
    const { placeInfo, title, content, placeId } = body;

    if (!title || !content || !placeId || !placeInfo) {
      return {
        success: false,
        error: "Title and content and placeId are required",
      };
    }
    console.log(placeInfo);

    const name = placeInfo.name;
    const lat = placeInfo.location.lat;
    const lng = placeInfo.location.lng;

    const [result] = await pool.query(
      `
        INSERT INTO
          bookmarks (placeId, name, lat, lng)
        VALUES
          (?, ?, ?, ?)
        ON 
          DUPLICATE KEY 
        UPDATE
          name = VALUES(name),
          lat = VALUES(lat),
          lng = VALUES(lng);

        INSERT INTO
          posts (placeId, title, content)
        VALUES
          (?, ?, ?)
        ON 
          DUPLICATE KEY 
        UPDATE
          title = VALUES(title),
          content = VALUES(content);
      `,
      [placeId, name, lat, lng, placeId, title, content] // 총 7개 값
    );

    return { success: true, message: "Post added" };
  }

  return { success: false, error: "Method not supported" };
});
