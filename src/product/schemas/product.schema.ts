import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  product_name: string;

  @Prop({ required: true })
  product_price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ default: 0 })
  sales: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
