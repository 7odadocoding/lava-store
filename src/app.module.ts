import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './modules/mail/mail.module';
import { CategoryModule } from './modules/category/category.module';
import { MongoConfigService } from './configs/database/mongo.config';
import { RedisModule } from './modules/redis/redis.module';
import { AuthModule } from './modules/user/auth/auth.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
@Module({
   imports: [
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
})
export class AppModule {}
