import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IUser } from '../user/dto/user.dto';

@Injectable()
export class MailService {
   constructor(private mailerService: MailerService) {}

   async sendUserConfirmation(user: IUser, sso: string): Promise<any> {
      return await this.mailerService.sendMail({
         to: user.email,
         subject: 'NestStore AuthSystem',
         template: './sso.ejs',
         context: {
            sso,
            name: user.firstname,
         },
      });
   }
}
