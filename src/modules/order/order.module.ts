import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';

@Module({
   controllers: [OrderController],
   providers: [OrderService],
   imports: [
      MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
   ],
})
export class OrderModule {}
