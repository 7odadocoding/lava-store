import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './dto/user.dto';
import {
   Post,
   Get,
   Body,
   HttpCode,
   UseGuards,
} from '@nestjs/common/decorators';
import { UserDocument } from './user.schema';
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
   async create(@Body() user: IUser): Promise<Partial<UserDocument>> {
      const userData: UserDocument = (await this.userService.createUser(
         user,
      )) as UserDocument;
      return {
         firstname: userData.firstname,
         lastname: userData.lastname,
         email: userData.email,
         _id: userData._id,
      };
   }
}
