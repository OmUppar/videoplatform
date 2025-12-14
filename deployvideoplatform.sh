#!/bin/sh

echo "🚀 Starting Video Platform Backend..."

# Print env vars (debug)
echo "DB_HOST=$DB_HOST"
echo "DB_PORT=$DB_PORT"
echo "PORT=$PORT"

# Run database migrations / sync if needed
# (Optional for TypeORM synchronize=true)

# Start NestJS in dev mode
npm run start:dev
