FROM node:22-alpine3.19

WORKDIR /app
COPY ./package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
ENV TZ=UTC
# Set the timezone in the container to UTC
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/UTC /etc/localtime && \
    echo "UTC" > /etc/timezone

CMD ["npm", "run", "start:dev"]
