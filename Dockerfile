# FROM node:22-alpine3.19

# WORKDIR /app
# COPY ./package.json .
# RUN npm install --legacy-peer-deps
# COPY . .
# RUN npm run build
# ENV TZ=UTC
# # Set the timezone in the container to UTC
# RUN apk add --no-cache tzdata && \
#     cp /usr/share/zoneinfo/UTC /etc/localtime && \
#     echo "UTC" > /etc/timezone

# CMD ["npm", "run", "start:dev"]


FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install ALL dependencies (dev + prod)
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Set timezone
ENV TZ=UTC
RUN apk add --no-cache tzdata bash && \
    cp /usr/share/zoneinfo/UTC /etc/localtime && \
    echo "UTC" > /etc/timezone

# Expose NestJS default port
EXPOSE 3000

# Run in dev/watch mode
CMD ["npm", "run", "start:dev"]
