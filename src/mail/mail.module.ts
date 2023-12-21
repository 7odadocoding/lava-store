import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
   imports: [
      MailerModule.forRootAsync({
         useFactory: async (config: ConfigService) => ({
            transport: {
               host: config.get('MAIL_HOST'),
               secure: true,
               auth: {
                  user: config.get('MAIL_USER'),
                  pass: config.get('MAIL_PASS'),
               },
            },
            defaults: {
               from: `"No Reply" <${config.get('MAIL_FROM')}>`,
            },
            template: {
               dir: join(__dirname, 'templates'),
               adapter: new EjsAdapter(),
               options: {
                  strict: true,
               },
            },
         }),
         inject: [ConfigService],
      }),
   ],
   providers: [MailService],
   exports: [MailService],
})
export class MailModule {}
