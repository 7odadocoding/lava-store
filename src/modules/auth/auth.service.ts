import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Otp } from '../user/interfaces/otp.interface';
import { Request } from 'express';
import { MailService } from 'src/services/mail/mail.service';
import { generateOtp } from '../user/user.utils';
import { IUser } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {
   constructor(
      private userService: UserService,
      private mailService: MailService,
   ) {}
   async signup(user: IUser): Promise<IUser> {
      return await this.userService.create(user);
   }

   async login(email: string, req: Request): Promise<IUser> {
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

   async sendOtpEmail(req: Request, user: IUser): Promise<void> {
      const baseUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}`;
      const otpUrl = `${baseUrl}/v1/auth/verify-otp?user=${user._id}&otp=${user.otp.value}`;
      await this.mailService.sendUserConfirmation(user, otpUrl);
      return;
   }

   newOtp(otp: string): Otp {
      return this.userService.otpConstruct(otp);
   }

   async updateOtp(userId: string, otp: string): Promise<Otp> {
      return await this.userService.changeUserOtp(userId, otp);
   }

   async expireOtp(userId: string) {
      return await this.userService.expireUserOtp(userId);
   }
}
