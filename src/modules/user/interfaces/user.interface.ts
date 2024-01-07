import { Otp } from './otp.interface';

export interface IUser {
   _id?: string;
   firstname: string;
   lastname: string;
   email: string;
   otp: Otp;
}
