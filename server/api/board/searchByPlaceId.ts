import { defineEventHandler, readBody } from "h3";
import getPool from "@/server/db/connection";

//placeId로 찾을 떄
export default defineEventHandler(async (event) => {
  const pool = getPool();
  const method = event.node.req.method;

  //게시글 조회
  if (method === "POST") {
    const body = await readBody(event);
    const { placeId } = body;

    if (!placeId) {
      throw createError({
        statusCode: 400,
        statusMessage: "placeId is required",
      });
    }
    try {
      const [rows] = await pool.query("SELECT * FROM posts WHERE PlaceId = ?", [
        placeId,
      ]);

      if (!rows || rows.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: "게시글을 찾을 수 없습니다.",
          data: { message: "해당 Place ID에 대한 게시글이 없습니다." },
        });
      }

      return { success: true, data: rows };
    } catch (error: any) {
      console.error("DB 오류:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "서버 오류 발생",
        data: {
          message: "데이터베이스 처리 중 오류가 발생했습니다.",
          error: error.message,
        },
      });
    }
  }

  return createError({
    statusCode: 405,
    statusMessage: "Method Not Allowed",
    data: { message: "지원되지 않는 요청 방식입니다." },
  });
});
