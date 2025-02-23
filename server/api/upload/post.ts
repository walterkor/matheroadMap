import { defineEventHandler } from "h3";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "./public/uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    upload.array("images", 10)(event.node.req, event.node.res, (err) => {
      if (err) reject(err);
      else {
        const files = event.node.req.files;
        const urls = files.map((file) => `/uploads/${file.filename}`);
        resolve({ urls });
      }
    });
  });
});
