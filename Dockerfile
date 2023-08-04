FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]

