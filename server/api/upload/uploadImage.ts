import { promises as fs } from "fs";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  if (!formData) {
    return { error: "파일이 존재하지 않습니다." };
  }

  const file = formData.find((item) => item.name === "uploadFile");
  const placeIdItem = formData.find((item) => item.name === "placeId");

  const placeId = placeIdItem?.data?.toString();
  if (!file || !file.filename || !file.data) {
    return { error: "잘못된 파일 데이터입니다." };
  }
  if (!placeId || placeId == null || placeId == "null") {
    return { error: "북마크 정보를 가져오지 못했습니다." };
  }

  const allowedExtensions = ["gif", "jpg", "jpeg", "png", "bmp"];
  const fileExt = file.filename.split(".").pop()?.toLowerCase();
  if (!fileExt || !allowedExtensions.includes(fileExt)) {
    return { error: "jpg, jpeg, png, bmp, gif 파일만 업로드 가능합니다." };
  }

  // 저장 경로
  const uniqueFileName = `${uuidv4()}.${fileExt}`;
  const uploadDir = path.resolve(`public/upload/${placeId}`);
  const filePath = path.join(uploadDir, uniqueFileName);

  await fs.mkdir(uploadDir, { recursive: true });

  // uploads 폴더 없으면 생성 필요 (수동 생성 권장)
  await fs.writeFile(filePath, file.data);

  // 반환 URL
  const fileUrl = `/upload/${placeId}/${uniqueFileName}`;

  return { url: fileUrl };
});
