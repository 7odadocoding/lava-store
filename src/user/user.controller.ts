import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';
import { Post, Body, HttpCode } from '@nestjs/common/decorators';
import { UserDocument } from './user.schema';
@Controller('user')
export class UserController {
   constructor(private userService: UserService) {}
   @Post()
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
