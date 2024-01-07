import mongoose, { Decimal128, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
   @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
   user: string;

   @Prop({ required: true, type: mongoose.Schema.Types.Decimal128 })
   total_price: Decimal128;

   @Prop({ required: true, default: [] })
   cart_items: string[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
