import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserRepository {
   constructor(@InjectModel(User.name) private userModel: Model<User>) {}

   async findById(userId: string): Promise<IUser> {
      const user = await this.userModel.findById(userId);
      if (!user) return null;
      const _id = user._id.toString();
      return {
         _id,
         firstname: user.firstname,
         lastname: user.lastname,
         email: user.email,
         phone: user.phone,
         otp: user.otp,
      };
   }

   async findByEmail(email: string): Promise<IUser> {
      const user = await this.userModel.findOne({ email });
      if (!user) return null;
      const _id = user._id.toString();
      return {
         _id,
         firstname: user.firstname,
         lastname: user.lastname,
         email: user.email,
         phone: user.phone,
         otp: user.otp,
      };
   }

   async create(userData: IUser): Promise<IUser> {
      const user = await this.userModel.create(userData);
      const _id = user._id.toString();
      return {
         _id,
         firstname: user.firstname,
         lastname: user.lastname,
         email: user.email,
         phone: user.phone,
         otp: user.otp,
      };
   }

   async update(newUserData: Partial<IUser>): Promise<IUser> {
      const { _id, ...newData } = newUserData;
      const user = await this.userModel.findByIdAndUpdate(
         _id,
         {
            ...newData,
         },
         { new: true },
      );
      const id = user._id.toString();
      return {
         _id: id,
         firstname: user.firstname,
         lastname: user.lastname,
         email: user.email,
         phone: user.phone,
         otp: user.otp,
      };
   }

   async deleteOne(userId: string): Promise<boolean> {
      try {
         const user = await this.userModel.findByIdAndDelete(userId);
         if (!user) return false;
         return true;
      } catch (error) {
         false;
      }
   }
}
