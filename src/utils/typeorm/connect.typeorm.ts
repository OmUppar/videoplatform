import { DataSource } from 'typeorm';
import {
  connectionErrorLogger,
  connectionInfoLogger,
} from '../logger/winston-connection.logger';

/**
 * Connect to database
 * @returns {Promise<void>}
 * @throws {Error}
 */

export async function connectDatabase(entityArrary: any): Promise<any> {
  try {
    connectionInfoLogger.info('Trying to connect to initial Database');

    if (
      !process.env.DB_HOST ||
      !process.env.DB_PORT ||
      !process.env.DB_USER ||
      !process.env.DB_PW ||
      !process.env.DB_NAME
    ) {
      console.log(`${
        process.env.DB_HOST ? 'DB_HOST is set' : 'DB_HOST is not set'
      }, ${process.env.DB_PORT ? 'DB_PORT is set' : 'DB_PORT is not set'}, ${
        process.env.DB_USER ? 'DB_USER is set' : 'DB_USER is not set'
      }, ${process.env.DB_PW ? 'DB_PW is set' : 'DB_PW is not set'}, ${
        process.env.DB_NAME ? 'DB_NAME is set' : 'DB_NAME is not set'
      }
                  `);
      return false;
    }

    // First create a temporary connection without synchronize
    const tempDataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      synchronize: false,
      logging: true,
      entities: entityArrary,
      dropSchema: false,
      // extra: {
      //   poolSize: 100000,
      //   max: 100000,
      //   connectionTimeoutMillis: 2000,
      //   idleTimeoutMillis: 2000,
      //   query_timeout: 20000,
      // },//Not Required for Temporary Connection
    });

    //do a temporary connection for schema creation
    const tempConnection = await tempDataSource.initialize();
    // await tempConnection.query('CREATE SCHEMA IF NOT EXISTS platform');
    // await tempConnection.query('CREATE SCHEMA IF NOT EXISTS orgsetup');
    // await tempConnection.query('CREATE SCHEMA IF NOT EXISTS evalnext');
    await tempConnection.destroy();

    // Now create the real connection with synchronize
    const finalDataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      entities: entityArrary,
      dropSchema: false,
      extra: {
        poolSize: 100000,
        max: 100000,
        connectionTimeoutMillis: 2000,
        idleTimeoutMillis: 2000,
        query_timeout: 20000,
      },
    });

    const dataSource = await finalDataSource.initialize();

    connectionInfoLogger.info('Database Initilized');

    return dataSource;
  } catch (error) {
    console.log(error);
    connectionErrorLogger.error('Error connecting to initial Database', error);

    return false;
  }
}
