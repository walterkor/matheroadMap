import { defineEventHandler, readBody } from "h3";
import getPool from "@/server/db/connection";

export default defineEventHandler(async (event) => {
  const pool = getPool();
  const method = event.node.req.method;
  const id = event.context.params?.id;

  if (!id) return { success: false, message: "User ID is required" };

  return "Hello Nitro";
});
