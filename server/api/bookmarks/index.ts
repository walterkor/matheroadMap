// BookMark : /api/bookmarks
import { defineEventHandler, readBody } from "h3";
import getPool from "@/server/db/connection";
import { MarkerInfo } from "@/types/MapTypes";

export default defineEventHandler(async (event) => {
  const pool = getPool();
  const method = event.node.req.method;
  if (method === "GET") {
    // 모든 북마크 조회
    const [rows] = await pool.query(
      "SELECT * FROM bookmarks WHERE isBookmarked = 1 ORDER BY id DESC"
    );

    // `rows`를 `MarkerInfo` 타입으로 변환
    const bookmarks: MarkerInfo[] = rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      position: {
        lat: row.lat,
        lng: row.lng,
      },
      isBookmarked: Boolean(row.isBookmarked),
      placeId: row.placeId,
    }));

    return { success: true, bookmarks };
  }

  return "Hello Nitro";
});
