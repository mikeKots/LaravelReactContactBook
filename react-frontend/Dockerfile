# Dockerfile for React App
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Clean npm cache and force clean install
RUN npm cache clean --force && rm -rf node_modules package-lock.json && npm install


COPY . .

EXPOSE 3000

CMD ["npm", "run", "build"]