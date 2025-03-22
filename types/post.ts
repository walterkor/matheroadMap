import { RowDataPacket } from "mysql2/promise";

export interface Post extends RowDataPacket {
  id: number;
  title: string | null;
  content: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  delYn: boolean | null;
  PlaceId: string | null;
}
