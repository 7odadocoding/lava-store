import {
   Controller,
   Get,
   Post,
   Body,
   HttpCode,
   Req,
   Query,
   HttpException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { UserDTO } from '../user.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { generateOtp } from '../user.utils';
import { MailService } from 'src/modules/mail/mail.service';
import { QueryDTO } from './query.dto';
import { JwtService } from '@nestjs/jwt';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
   constructor(
      private authService: AuthService,
      private mailService: MailService,
      private jwtService: JwtService,
   ) {}

   @Post('signup')
   @HttpCode(201)
   async signup(
      @Body() user: UserDTO,
      @Req() req: Request,
   ): Promise<Partial<UserDTO>> {
      const userDto = await this.authService.signup(user);
      const otpString = generateOtp();
      const { otp, ...userData } = await this.authService.updateOtp(
         userDto._id,
         otpString,
      );
      const baseUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}`;
      console.log(otp.value);

      const otpUrl = `${baseUrl}/v1/auth/verify-otp?user=${userData._id}&otp=${otp.value}`;
      await this.mailService.sendUserConfirmation(user, otpUrl);

      return userData;
   }

   @Post('login')
   @HttpCode(200)
   async login(@Body() body: { email: string }, @Req() req: Request) {
      const userDto = await this.authService.login(body.email);
      if (!userDto)
         throw new HttpException(
            'user with this email not found',
            HttpStatus.NOT_FOUND,
         );
      const otpString = generateOtp();
      const { otp, ...userData } = await this.authService.updateOtp(
         userDto._id,
         otpString,
      );
      const baseUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}`;
      console.log(otp.value);

      const otpUrl = `${baseUrl}/v1/auth/verify-otp?user=${userData._id}&otp=${otp.value}`;
      await this.mailService.sendUserConfirmation(userDto, otpUrl);

      return { error: null, message: 'Login link sent to your email' };
   }

   @Get('verify-otp')
   @HttpCode(200)
   async verifyOtp(@Query() query: QueryDTO) {
      const { user, otp } = query;
      const isValidOtp = await this.authService.verifyOtp(user, otp);
      if (!isValidOtp)
         throw new HttpException(
            {
               error: 'invalid_otp',
               message: 'please check your email for the right login URL',
            },
            HttpStatus.FORBIDDEN, // 403 status code
         );

      const token = this.jwtService.sign({ sub: user });
      console.log('TOKEN:', token);

      return {
         error: null,
         message: 'logged in successfully',
         data: {
            token,
         },
      };
   }
}
