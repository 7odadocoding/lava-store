import { Injectable } from '@nestjs/common';
import { ISso, IUser } from './user.interface';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailService } from 'src/mail/mail.service';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
   constructor(
      @InjectModel(User.name) private userModel: Model<User>,
      private mailService: MailService,
   ) {}
   async createUser(user: IUser): Promise<UserDocument | Error> {
      try {
         const newUser = new this.userModel(user);
         const randomBytes = new Uint8Array(4);
         crypto.getRandomValues(randomBytes);
         const ssoValue = Buffer.from(randomBytes).toString('hex');
         const expDate: Date = new Date(Date.now());
         const sso: ISso = {
            value: ssoValue,
            expDate,
            expired: false,
         };
         await this.mailService.sendUserConfirmation(user, sso.value);

         newUser.sso = sso;
         return await newUser.save();
      } catch (error) {
         throw error;
      }
   }
}
