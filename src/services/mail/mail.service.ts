import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IUser } from 'src/modules/user/interfaces/user.interface';

@Injectable()
export class MailService {
   constructor(private mailerService: MailerService) {}

   async sendUserConfirmation(user: IUser, otp: string): Promise<any> {
      return await this.mailerService.sendMail({
         to: user.email,
         subject: 'Lava Store AuthSystem',
         template: './otp.ejs',
         context: {
            otp,
            name: user.firstname,
         },
      });
   }
}
