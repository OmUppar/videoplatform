# -------- Base image --------
    FROM node:20-alpine

    # -------- App directory --------
    WORKDIR /app
    
    # -------- Copy package files --------
    COPY package*.json ./
    
    # -------- Install dependencies --------
    RUN npm install
    
    # -------- Copy source code --------
    COPY . .
    
    # -------- Build NestJS --------
    RUN npm run build
    
    # -------- Expose port --------
    EXPOSE 3000
    
    # -------- Start app --------
    CMD ["node", "dist/main.js"]
    