import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { connectDatabase } from './utils/typeorm/connect.typeorm';
import { entities } from './seeds/entities/seed.entity';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';

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
