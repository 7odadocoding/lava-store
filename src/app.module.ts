import * as path from 'path';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './services/mail/mail.module';
import { CategoryModule } from './modules/category/category.module';
import { MongoConfigService } from './configs/database/mongo.config';
import { RedisModule } from './services/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { CloudinaryModule } from './services/cloudinary/cloudinary.module';
import { AppController } from './app.controller';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';

@Module({
   imports: [
      I18nModule.forRoot({
         fallbackLanguage: 'en',
         loaderOptions: {
            path: path.join(__dirname, '/i18n/'),
            watch: true,
         },
         resolvers: [
            { use: QueryResolver, options: ['lang'] },
            AcceptLanguageResolver,
         ],
      }),
      ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forRootAsync({
         useClass: MongoConfigService,
      }),
      JwtModule.register({
         global: true,
         secret: process.env.JWT_SECRET,
         signOptions: { expiresIn: '1d' },
      }),
      UserModule,
      ProductModule,
      CartModule,
      OrderModule,
      MailModule,
      CategoryModule,
      RedisModule,
      AuthModule,
      CloudinaryModule,
   ],
   controllers: [AppController],
})
export class AppModule {}
