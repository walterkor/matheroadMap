import { UserService } from "@/server/service/userService";

const userService = new UserService();

export const getAllUsers = async () => {
  const users = await userService.getAllUsers();
  return { success: true, users };
};

export const getUserById = async (id: number) => {
  const user = await userService.getUserById(id);
  if (!user) {
    return { success: false, message: "User not found" };
  }
  return { success: true, user };
};

export const createUser = async (username: string, email: string) => {
  const userId = await userService.createUser(username, email);
  return { success: true, userId };
};

export const updateUser = async (
  id: number,
  username: string,
  email: string
) => {
  const updated = await userService.updateUser(id, username, email);
  return updated
    ? { success: true }
    : { success: false, message: "Failed to update user" };
};

export const deleteUser = async (id: number) => {
  const deleted = await userService.deleteUser(id);
  return deleted
    ? { success: true }
    : { success: false, message: "Failed to delete user" };
};
