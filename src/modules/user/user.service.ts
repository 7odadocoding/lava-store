import { Injectable, UseInterceptors } from '@nestjs/common';
import { ISso, IUser } from './dto/user.dto';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { generateSso } from './user.utils';
import { MailService } from '../mail/mail.service';

@UseInterceptors(new LoggingInterceptor())
@Injectable()
export class UserService {
   constructor(
      @InjectModel(User.name) private userModel: Model<User>,
      private mailService: MailService,
   ) {}
   async createUser(user: IUser): Promise<UserDocument | Error> {
      try {
         const newUser = new this.userModel(user);

         const ssoString = generateSso();
         const mail = await this.mailService.sendUserConfirmation(
            user,
            ssoString,
         );
         console.info(mail);

         // set user sso to new constructed sso
         newUser.sso = this.ssoConsruct(ssoString);

         // save the user and  return user data
         return await newUser.save();
      } catch (error) {
         throw error;
      }
   }

   private ssoConsruct(ssoString: string): ISso {
      const expDate: Date = new Date(Date.now());
      return {
         value: ssoString,
         expDate,
         expired: false,
      };
   }
}
