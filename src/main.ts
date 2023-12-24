import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as compression from 'compression';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   app.use(compression());
   app.enableVersioning({
      type: VersioningType.URI,
   });
   app.enableCors({ origin: 'http://127.0.0.1:3000' });

   await app.listen(3000);

   console.log('server is running on http://127.0.0.1:3000');
}
bootstrap();
