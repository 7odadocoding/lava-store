import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Otp } from './interfaces/otp.interface';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
   constructor(private userRepository: UserRepository) {}

   async create(user: IUser): Promise<IUser> {
      return await this.userRepository.create(user);
   }

   async getById(userId: string): Promise<IUser> {
      return await this.userRepository.findById(userId);
   }

   async getByEmail(email: string): Promise<IUser> {
      return await this.userRepository.findByEmail(email);
   }

   async update(newUserData: Partial<IUser>): Promise<Partial<IUser>> {
      return await this.userRepository.update(newUserData);
   }

   async delete(userId: string, otp: string): Promise<boolean> {
      const isValidOtp = await this.checkOtp(userId, otp);
      if (!isValidOtp) return false;
      return await this.userRepository.deleteOne(userId);
   }

   async expireUserOtp(userId: string): Promise<Otp> {
      const { otp } = await this.userRepository.findById(userId);
      otp.expired = true;
      const user = await this.userRepository.update({ otp });
      return user.otp;
   }

   async changeUserOtp(userId: string, newOtp: string): Promise<Otp> {
      const otp = this.otpConstruct(newOtp);
      const user = await this.userRepository.update({ _id: userId, otp });
      return user.otp;
   }

   async checkOtp(userId: string, enteredOtp: string): Promise<boolean> {
      try {
         const { otp } = await this.userRepository.findById(userId);
         const currentDate = new Date(Date.now());
         const isExpired = otp.expDate < currentDate || otp.expired;
         const invalidOtp = otp.value != enteredOtp;
         if (isExpired || invalidOtp) return false;
         return true;
      } catch (error) {
         return false;
      }
   }

   otpConstruct(otp: string): Otp {
      const tenMinutes = 5000 * 60;
      const expDate: Date = new Date(Date.now() + tenMinutes);
      return { value: otp, expired: false, expDate };
   }
}
