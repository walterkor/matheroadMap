import pool from "@/server/db/connection";

export class UserRepository {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM users");
    return JSON.parse(JSON.stringify(rows));
  }

  async findById(id: number) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return JSON.parse(JSON.stringify(rows))[0];
  }

  async create(username: string, email: string) {
    const [result] = await pool.execute(
      "INSERT INTO users (username, email) VALUES (?, ?)",
      [username, email]
    );
    return (result as any).insertId;
  }

  async update(id: number, username: string, email: string) {
    const [result] = await pool.execute(
      "UPDATE users SET username = ?, email = ? WHERE id = ?",
      [username, email, id]
    );
    return (result as any).affectedRows > 0;
  }

  async delete(id: number) {
    const [result] = await pool.execute("DELETE FROM users WHERE id = ?", [id]);
    return (result as any).affectedRows > 0;
  }
}
