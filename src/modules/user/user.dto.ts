import { OtpDTO } from './otp.dto';

export interface UserDTO {
   _id?: string;
   firstname: string;
   lastname: string;
   email: string;
   otp: OtpDTO;
}

export function createUserDto(
   _id: string,
   firstname: string,
   lastname: string,
   email: string,
   otpData: OtpDTO,
): UserDTO {
   return {
      _id,
      firstname,
      lastname,
      email,
      otp: otpData,
   };
}
