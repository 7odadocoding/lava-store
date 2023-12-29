import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user.module';
import { UserRepository } from '../user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user.schema';

@Module({
   imports: [
      UserModule,
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
   ],
   providers: [AuthService, UserRepository],
   controllers: [AuthController],
})
export class AuthModule {}