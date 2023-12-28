import { Injectable, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { UserRepository } from './user.repository';

@UseInterceptors(new LoggingInterceptor())
@Injectable()
export class UserService {
   constructor(private userRepository: UserRepository) {}
}
