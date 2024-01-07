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
import { AuthService } from './auth.service';
import { Request } from 'express';
import { generateOtp } from '../user/user.utils';
import { IQuery } from './interfaces/query.interface';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../user/interfaces/user.interface';
import { CreateUserDto } from '../user/dto/user.dto';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
   constructor(
      private authService: AuthService,
      private jwtService: JwtService,
   ) {}

   @Post('signup')
   @HttpCode(201)
   async signup(
      @Body() userDto: CreateUserDto,
      @Req() req: Request,
   ): Promise<Partial<IUser>> {
      userDto.otp = this.authService.newOtp(generateOtp());
      const user = await this.authService.signup(userDto);
      await this.authService.sendOtpEmail(req, user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { otp, ...secureUser } = user;
      return secureUser;
   }

   @Post('login')
   @HttpCode(200)
   async login(@Body() body: { email: string }, @Req() req: Request) {
      const user = await this.authService.login(body.email, req);
      if (!user)
         throw new HttpException(
            'user with this email not found',
            HttpStatus.NOT_FOUND,
         );

      return { error: null, message: 'Login link sent to your email' };
   }

   @Get('verify-otp')
   @HttpCode(200)
   async verifyOtp(@Query() query: IQuery) {
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
