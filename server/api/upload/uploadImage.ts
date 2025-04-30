import { v4 as uuidv4 } from "uuid";
import { promises as fs } from "fs";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/utils/S3Client";

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
  const key = `${placeId}/${uniqueFileName}`; //s3 내 경로 (변경해야함...)

  await s3.send(
    new PutObjectCommand({
      Bucket: "my-bucket",
      Key: key,
      Body: file.data,
      ContentType: file.type || "image/jpeg",
      ACL: "public-read", // 로컬 테스트용으로 공개 URL 허용
    })
  );

  // 반환 URL
  const fileUrl = `http://localhost:4566/my-bucket/${key}`;

  return { url: fileUrl };
});
