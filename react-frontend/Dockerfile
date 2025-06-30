# Dockerfile for React App
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --prefer-offline --no-audit --progress=false


COPY . .

EXPOSE 3000

CMD ["npm", "run", "build"]