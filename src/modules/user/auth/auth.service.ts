import { Injectable } from '@nestjs/common';
import { UserDTO } from '../user.dto';
import { UserService } from '../user.service';
import { OtpDTO } from '../otp.dto';
import { Request } from 'express';
import { MailService } from 'src/modules/mail/mail.service';
import { generateOtp } from '../user.utils';

@Injectable()
export class AuthService {
   constructor(
      private userService: UserService,
      private mailService: MailService,
   ) {}
   async signup(user: UserDTO): Promise<UserDTO> {
      return await this.userService.create(user);
   }

   async login(email: string, req: Request): Promise<UserDTO> {
      const user = await this.userService.getByEmail(email);
      if (!user) return;
      const otp = await this.updateOtp(user._id, generateOtp());
      user.otp = otp;
      this.sendOtpEmail(req, user);
      return user;
   }

   async verifyOtp(userId: string, otp: string): Promise<boolean> {
      return await this.userService.checkOtp(userId, otp);
   }

   async sendOtpEmail(req: Request, user: UserDTO): Promise<void> {
      const baseUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}`;
      const otpUrl = `${baseUrl}/v1/auth/verify-otp?user=${user._id}&otp=${user.otp.value}`;
      await this.mailService.sendUserConfirmation(user, otpUrl);
      return;
   }

   newOtp(otp: string): OtpDTO {
      return this.userService.otpConstruct(otp);
   }

   async updateOtp(userId: string, otp: string): Promise<OtpDTO> {
      return await this.userService.changeUserOtp(userId, otp);
   }

   async expireOtp(userId: string) {
      return await this.userService.expireUserOtp(userId);
   }
}
