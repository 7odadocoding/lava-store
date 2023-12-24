import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
   ],
   controllers: [UserController],
   providers: [
      UserService,
      { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
   ],
})
export class UserModule {}
