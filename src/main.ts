import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { connectDatabase } from './utils/typeorm/connect.typeorm';
import { entities } from './seeds/entities/seed.entity';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './utils/swagger/setup.swagger';
import { BadRequestException } from '@nestjs/common';

/**
 * Variable to store database connection
 * @type {DataSource}
 */
export let dataSource: DataSource;

async function bootstrap(): Promise<void> {
  let app: NestExpressApplication;
  try {
    dotenv.config();
    console.log('ENV:', process.env.DB_HOST, process.env.DB_PORT);
    // connect to the database, if not connected throw an error
    dataSource = await connectDatabase(entities);
    if (!dataSource) {
      console.log('Failed to connect to database');
      process.exit(1);
    }

    // create application instance with NestFactory
    app = await NestFactory.create<NestExpressApplication>(AppModule, {
      abortOnError: true,
    });

    await setupSwagger(
      app,
      (process.env.SWAGGER_API_TITLE as string) || 'First',
      (process.env.SWAGGER_API_DESCRIPTION as string) || 'First',
      (process.env.SWAGGER_SERVER_URL as string) || 'First',
      (process.env.SWAGGER_API_VERSION as string) || 'First',
      (process.env.SWAGGER_IMAGE_URL as string) || 'First',
      (process.env.SWAGGER_TOP_BAR_COLOR as string) || 'First',
      (process.env.SWAGGER_BACKGROUND_COLOR as string) || 'First',
      (process.env.SWAGGER_CUSTOM_TITLE as string) || 'First',
    );

    const whitelist = [
      'http://localhost:3000', // React dev server (adjust port if needed)
      'http://localhost:3001', // optional if React runs on 3001
      'https://omuppar.github.io/video-platform-UI', // your deployed frontend
    ];

    app.enableCors({
      origin: (origin, callback) => {
        // allow requests with no origin (e.g., Postman, server-to-server)
        if (!origin || whitelist.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type,Authorization',
      credentials: true,
    });

    // listen to the port defined in .env file or 3000
    await app.listen(process.env.PORT || 3000);
  } catch (error) {
    console.log(error);

    //exit the process after 10 seconds
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  }
}

bootstrap();
