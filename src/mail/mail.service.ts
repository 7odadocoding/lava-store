import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IUser } from 'src/user/user.interface';
// import { ConfigService } from '@nestjs/config';
@Injectable()
export class MailService {
   constructor(
      private mailerService: MailerService,
      // private config: ConfigService,
   ) {}

   async sendUserConfirmation(user: IUser, sso: string) {
      await this.mailerService.sendMail({
         to: user.email,
         // from: '"Support Team" <support@example.com>', // override default from
         subject: 'Welcome to NestStore',
         template: './sso.ejs',
         context: {
            sso,
            name: user.firstname,
         },
      });
   }
}
