import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as compression from 'compression';
import { join } from 'path';

async function bootstrap() {
   const app = await NestFactory.create<NestExpressApplication>(AppModule);

   app.use(compression());
   app.enableVersioning({
      type: VersioningType.URI,
   });
   app.enableCors({ origin: '*' });
   app.useStaticAssets(join(__dirname, '..', 'public'));
   app.setBaseViewsDir(join(__dirname, '..', 'views'));
   app.setViewEngine('ejs');
   const port = +process.env.PORT || 3000;
   await app.listen(port);

   console.log(`server is running on ${await app.getUrl()}`);
}
bootstrap();
