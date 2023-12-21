import mongoose, { Decimal128, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/schemas/user.schema';
import { Product } from '../../product/schemas/product.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: mongoose.Schema.Types.Decimal128 })
  total_price: Decimal128;

  @Prop({ required: true, default: [] })
  products: Product[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
