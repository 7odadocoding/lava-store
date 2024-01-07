import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CartItem } from 'src/common/interfaces/cartItem.interface';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
   @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
   user_id: string;

   @Prop({
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
   })
   products: CartItem[];

   @Prop({ required: true, default: new Date() })
   order_date: Date;

   @Prop({ required: true, default: 'under_review' })
   state: 'under_review' | 'confirmed' | 'out_for_delivery' | 'received';

   @Prop({ required: true })
   email: string;

   @Prop({ required: true })
   phone: string;

   @Prop({ required: true })
   governorate: string;

   @Prop({ required: true })
   city: string;

   @Prop({ required: true })
   street: string;

   @Prop({ required: true })
   nearest_landmark: string;

   @Prop({ required: true, default: 0 })
   orderTotalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
