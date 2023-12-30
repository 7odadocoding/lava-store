import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDTO } from './user.dto';
import { OtpDTO, createOtpDto } from './otp.dto';

@Injectable()
export class UserService {
   constructor(private userRepository: UserRepository) {}

   async create(user: UserDTO): Promise<UserDTO> {
      return await this.userRepository.create(user);
   }

   async getById(userId: string): Promise<UserDTO> {
      return await this.userRepository.findById(userId);
   }

   async getByEmail(email: string): Promise<UserDTO> {
      return await this.userRepository.findByEmail(email);
   }

   async update(newUserData: Partial<UserDTO>): Promise<Partial<UserDTO>> {
      return await this.userRepository.update(newUserData);
   }

   async delete(userId: string, otp: string): Promise<boolean> {
      const isValidOtp = await this.checkOtp(userId, otp);
      if (!isValidOtp) return false;
      return await this.userRepository.deleteOne(userId);
   }

   async expireUserOtp(userId: string): Promise<OtpDTO> {
      const { otp } = await this.userRepository.findById(userId);
      otp.expired = true;
      await this.userRepository.update({ otp });
      return createOtpDto(otp.value, otp.expired, otp.expDate);
   }

   async changeUserOtp(userId: string, newOtp: string): Promise<OtpDTO> {
      const otp = this.otpConstruct(newOtp);
      await this.userRepository.update({ _id: userId, otp });
      return createOtpDto(otp.value, otp.expired, otp.expDate);
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

   otpConstruct(otp: string): OtpDTO {
      const tenMinutes = 5000 * 60;
      const expDate: Date = new Date(Date.now() + tenMinutes);
      return createOtpDto(otp, false, expDate);
   }
}
