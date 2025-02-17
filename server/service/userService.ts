import { UserRepository } from "@/server/repository/userRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number) {
    return await this.userRepository.findById(id);
  }

  async createUser(username: string, email: string) {
    return await this.userRepository.create(username, email);
  }

  async updateUser(id: number, username: string, email: string) {
    return await this.userRepository.update(id, username, email);
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
}
