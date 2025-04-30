import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "./S3Client";

export async function getPresignedUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: "my-bucket", // 사전에 생성한 버킷
    Key: key,
    ContentType: contentType,
  });

  return await getSignedUrl(s3, command, { expiresIn: 3600 });
}
