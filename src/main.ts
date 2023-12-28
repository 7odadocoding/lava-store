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
   app.enableCors({ origin: '*' });
   const port = +process.env.PORT || 3000;
   await app.listen(port);

   console.log(`server is running on ${await app.getUrl()}`);
}
bootstrap();
