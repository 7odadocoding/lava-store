import { Injectable } from '@nestjs/common';
import { UserDTO } from '../user.dto';
import { OtpDTO } from '../otp.dto';
import { UserRepository } from '../user.repository';

@Injectable()
export class AuthService {
   constructor(private userRepository: UserRepository) {}
   async signup(user: UserDTO): Promise<UserDTO> {
      const userDto = await this.userRepository.create(user);
      return userDto;
   }

   async login(email: string): Promise<UserDTO> {
      const userDto = await this.userRepository.findByEmail(email);
      return userDto;
   }

   async verifyOtp(userId: string, otp: string): Promise<boolean> {
      const user = await this.userRepository.findById(userId);

      if (!user || user.otp.value != otp || user.otp.expired) return false;
      const isExpiredDate = new Date(Date.now()) > user.otp.expDate;

      if (isExpiredDate) return false;
      this.expireOtp(userId, otp);
      return true;
   }

   async updateOtp(id: string, otp: string) {
      return await this.userRepository.update({
         _id: id,
         otp: this.otpConstruct(otp),
      });
   }

   async expireOtp(id: string, otp: string) {
      return await this.userRepository.update({
         _id: id,
         otp: this.otpConstruct(otp, true),
      });
   }

   private otpConstruct(otp: string, expired = false): OtpDTO {
      // set expDate after 10 minutes
      const tenMinutes = 5000 * 60;
      const expDate: Date = new Date(Date.now() + tenMinutes);
      return {
         value: otp,
         expDate,
         expired,
      };
   }
}
