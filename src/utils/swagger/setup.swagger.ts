import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  connectionErrorLogger,
  connectionInfoLogger,
} from '../logger/winston-connection.logger';

/**
 * Setup swagger API documentation
 * @exports
 * @function setupSwagger
 * @param {any} app
 * @returns {Promise<void>}
 * @throws {Error}
 */
export async function setupSwagger(
  app: any,
  title: string,
  description: string,
  serverDefault: string,
  version: string,
  imageUrl: string,
  topBarColor: string,
  backgroundColor: string,
  customTitle: string,
): Promise<void> {
  try {
    connectionInfoLogger.info('Trying to setup swagger...');
    const options = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .addServer(serverDefault)
      .setVersion(version)
      .build();
    const options2 = {
      customCss: `
    body {
      margin: 0;
      height: 100vh;
      width: 100vw;
    }
    
    .topbar-wrapper img {content:url('${imageUrl}'); width: 100px; height:auto;}
    
    .swagger-ui .topbar { background-color: ${topBarColor}; }
    
    .swagger-ui { background-color: ${backgroundColor};  }

    .scheme-container { 
      background: mintcream;
      -webkit-box-shadow: -15px 17px 45px 0px rgba(0,0,0,0.75);
      -moz-box-shadow: -15px 17px 45px 0px rgba(0,0,0,0.75);
      box-shadow: -15px 17px 45px 0px rgba(0,0,0,0.75);
      margin: 0 0 20px;
      padding: 30px 0;
      border-radius: 10px;
    }
    `,
      customSiteTitle: customTitle,
    };

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document, options2);

    connectionInfoLogger.info('Swagger setup complete!');
  } catch (error) {
    connectionErrorLogger.error('Swagger setup failed!');
    console.error(error);
  }
}
