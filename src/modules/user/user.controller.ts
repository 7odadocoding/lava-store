import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Get, HttpCode, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller({ version: '1', path: 'users' })
export class UserController {
   constructor(private userService: UserService) {}

   // example of some protected resource
   @Get()
   @HttpCode(200)
   @UseGuards(AuthGuard)
   getUsers(): string {
      return 'hello';
   }
}
