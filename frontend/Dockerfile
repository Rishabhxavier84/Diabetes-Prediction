# FROM node:26-slim AS builder

# WORKDIR /app

# COPY package*.json .
# RUN npm ci

# COPY . .

# RUN npm run build

# FROM nginx:alpine

# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=builder /app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD [ "nginx", "-g", "daemon off;" ]

FROM node:26-slim

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev", "--", "--host" ]