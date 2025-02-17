import {
  getUserById,
  updateUser,
  deleteUser,
} from "@/server/controllers/userController";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const id = event.context.params?.id;

  if (!id) return { success: false, message: "User ID is required" };

  if (method === "GET") {
    return await getUserById(Number(id));
  }

  if (method === "PUT") {
    const body = await readBody(event);
    const { username, email } = body;
    return await updateUser(Number(id), username, email);
  }

  if (method === "DELETE") {
    return await deleteUser(Number(id));
  }

  return { success: false, message: "405 Method Not Allowed" };
});
