import { Injectable, UseInterceptors } from '@nestjs/common';
import { OtpDTO, UserDTO } from './dto/user.dto';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { generateOtp } from './user.utils';
import { MailService } from '../mail/mail.service';

@UseInterceptors(new LoggingInterceptor())
@Injectable()
export class UserService {
   constructor(
      @InjectModel(User.name) private userModel: Model<User>,
      private mailService: MailService,
   ) {}
   async createUser(user: UserDTO): Promise<UserDocument | Error> {
      try {
         const newUser = new this.userModel(user);
         const otp = generateOtp();

         await this.mailService.sendUserConfirmation(user, otp);
         newUser.otp = this.otpConstruct(otp);
         return await newUser.save();
      } catch (error) {
         throw error;
      }
   }

   private otpConstruct(otp: string): OtpDTO {
      const expDate: Date = new Date(Date.now());
      return {
         value: otp,
         expDate,
         expired: false,
      };
   }
}
