import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import {
   Post,
   Get,
   Body,
   HttpCode,
   UseGuards,
} from '@nestjs/common/decorators';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller({ version: '1', path: 'users' })
export class UserController {
   constructor(private userService: UserService) {}

   // example of some protected resource
   @Get()
   @HttpCode(200)
   @UseGuards(AuthGuard)
   getUsers(): string {
      return 'hello from users';
   }

   @Post('signup')
   @HttpCode(201)
   async create(@Body() user: UserDTO): Promise<Partial<UserDTO>> {
      const { otp, ...userData } = (await this.userService.createUser(
         user,
      )) as UserDTO;

      console.log(otp);
      return userData;
   }
}
