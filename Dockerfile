FROM node:20-alpine
WORKDIR /app

# 꼭 필요한 파일만 복사
COPY package.json package-lock.json* ./
RUN npm install --production

# 이미 빌드된 결과물 복사
COPY .output/ .output/

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]