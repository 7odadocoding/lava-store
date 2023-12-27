import { OtpDTO } from './dto/user.dto';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
   @Prop({ required: true })
   firstname: string;

   @Prop({ required: true })
   lastname: string;

   @Prop({ required: true, unique: true })
   email: string;

   @Prop({
      type: {
         value: String,
         expired: Boolean,
         expDate: Date,
      },
   })
   otp: OtpDTO;
}

export const UserSchema = SchemaFactory.createForClass(User);
