import { Injectable, UseInterceptors } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { OtpDTO } from './otp.dto';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { generateOtp } from './user.utils';
import { MailService } from '../mail/mail.service';
import { UserRepository } from './user.repository';

@UseInterceptors(new LoggingInterceptor())
@Injectable()
export class UserService {
   constructor(
      private userRepository: UserRepository,
      private mailService: MailService,
   ) {}
   async createUser(user: UserDTO): Promise<UserDTO | Error> {
      try {
         const userDto = await this.userRepository.create(user);
         const otp = generateOtp();
         await this.mailService.sendUserConfirmation(user, otp);
         userDto.otp = this.otpConstruct(otp);
         await this.userRepository.update(userDto);
         return userDto;
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
