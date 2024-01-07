import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';

@Module({
   imports: [
      UserModule,
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
   ],
   providers: [AuthService, UserService, UserRepository],
   controllers: [AuthController],
})
export class AuthModule {}
