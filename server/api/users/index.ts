import { getAllUsers, createUser } from "@/server/controllers/userController";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "GET") {
    return await getAllUsers();
  }

  if (method === "POST") {
    const body = await readBody(event);
    const { username, email } = body;
    return await createUser(username, email);
  }

  return { success: false, message: "405 Method Not Allowed" };
});
