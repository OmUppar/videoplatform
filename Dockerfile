FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# 🔥 REQUIRED for Gmail SMTP
RUN apk add --no-cache \
    bash \
    tzdata \
    ca-certificates \
    openssl

ENV TZ=UTC
RUN cp /usr/share/zoneinfo/UTC /etc/localtime && echo "UTC" > /etc/timezone

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
