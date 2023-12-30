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
import { QueryDTO } from './query.dto';
import { JwtService } from '@nestjs/jwt';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
   constructor(
      private authService: AuthService,
      private jwtService: JwtService,
   ) {}

   @Post('signup')
   @HttpCode(201)
   async signup(
      @Body() user: Partial<UserDTO>,
      @Req() req: Request,
   ): Promise<Partial<UserDTO>> {
      user.otp = this.authService.newOtp(generateOtp());
      const userDto = await this.authService.signup(user as UserDTO);
      await this.authService.sendOtpEmail(req, userDto);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { otp, ...secureUser } = userDto;
      return secureUser;
   }

   @Post('login')
   @HttpCode(200)
   async login(@Body() body: { email: string }, @Req() req: Request) {
      const userDto = await this.authService.login(body.email, req);
      if (!userDto)
         throw new HttpException(
            'user with this email not found',
            HttpStatus.NOT_FOUND,
         );

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
