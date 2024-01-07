import { Otp } from '../interfaces/otp.interface';

export class CreateUserDto {
   _id: string;
   firstname: string;
   lastname: string;
   email: string;
   phone: string;
   otp: Otp;
}
