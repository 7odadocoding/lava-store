import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserDTO, createUserDto } from './user.dto';

@Injectable()
export class UserRepository {
   constructor(@InjectModel(User.name) private userModel: Model<User>) {}

   async findById(userId: string): Promise<UserDTO> {
      const user = await this.userModel.findById(userId);
      if (!user) return null;
      const _id = user._id.toString();
      return createUserDto(
         _id,
         user.firstname,
         user.lastname,
         user.email,
         user.otp,
      );
   }

   async findByEmail(email: string): Promise<UserDTO> {
      const user = await this.userModel.findOne({ email });
      if (!user) return null;
      const _id = user._id.toString();
      return createUserDto(
         _id,
         user.firstname,
         user.lastname,
         user.email,
         user.otp,
      );
   }

   async create(userData: UserDTO): Promise<UserDTO> {
      const user = await this.userModel.create(userData);
      const _id = user._id.toString();
      return createUserDto(
         _id,
         user.firstname,
         user.lastname,
         user.email,
         user.otp,
      );
   }

   async update(newUserData: Partial<UserDTO>): Promise<UserDTO> {
      const { _id, ...newData } = newUserData;
      const user = await this.userModel.findByIdAndUpdate(
         _id,
         {
            ...newData,
         },
         { new: true },
      );
      const id = user._id.toString();
      return createUserDto(
         id,
         user.firstname,
         user.lastname,
         user.email,
         user.otp,
      );
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
