import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const { mysql } = useNitroApp();
  const method = event.node.req.method;

  //최근 게시글 9개 조회
  if (method === "GET") {
    const [rows] = await mysql.query(
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
