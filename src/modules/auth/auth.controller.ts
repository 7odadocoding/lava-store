import {
   Controller,
   Get,
   Post,
   Body,
   HttpCode,
   Query,
   HttpException,
   Res,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthService } from './auth.service';
import { generateOtp } from '../user/user.utils';
import { IQuery } from './interfaces/query.interface';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../user/interfaces/user.interface';
import { CreateUserDto } from '../user/dto/user.dto';
import { Response } from 'express';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
   constructor(
      private authService: AuthService,
      private jwtService: JwtService,
   ) {}

   @Post('signup')
   @HttpCode(201)
   async signup(@Body() userDto: CreateUserDto): Promise<Partial<IUser>> {
      userDto.otp = this.authService.newOtp(generateOtp());
      const user = await this.authService.signup(userDto);
      await this.authService.sendOtpEmail(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { otp, ...secureUser } = user;
      return secureUser;
   }

   @Post('request-login')
   @HttpCode(200)
   async requestLogin(@Body() body: { email: string }) {
      const user = await this.authService.requestLogin(body.email);
      if (!user)
         throw new HttpException(
            'user with this email not found',
            HttpStatus.NOT_FOUND,
         );

      return { statusCode: 200, message: 'Login link sent to your email' };
   }

   @Get('login')
   @HttpCode(200)
   async login(
      @Query() query: IQuery,
      @Res({ passthrough: true }) res: Response,
   ) {
      const { user, otp } = query;
      const isValidOtp = await this.authService.login(user, otp);
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
      return res.cookie('token', token).redirect('/');
   }
}
