import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { UserRepository } from './user.repository';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
   ],
   controllers: [UserController],
   providers: [
      UserService,
      UserRepository,
      { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
   ],
})
export class UserModule {}
