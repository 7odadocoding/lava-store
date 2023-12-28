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

@Module({
   imports: [
      UserModule,
      ProductModule,
      CartModule,
      OrderModule,
      ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forRootAsync({
         useClass: MongoConfigService,
      }),
      MailModule,
      CategoryModule,
      RedisModule,
   ],
})
export class AppModule {}
