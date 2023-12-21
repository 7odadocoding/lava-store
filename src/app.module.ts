import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { CategoryModule } from './category/category.module';

@Module({
   imports: [
      UserModule,
      ProductModule,
      CartModule,
      OrderModule,
      ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forRoot(process.env.MONGO_URI),
      MailModule,
      CategoryModule,
   ],
})
export class AppModule {}
