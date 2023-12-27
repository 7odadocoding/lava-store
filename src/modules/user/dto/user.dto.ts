export interface OtpDTO {
   value: string;
   expired: boolean;
   expDate: Date;
}

export interface UserDTO {
   firstname: string;
   lastname: string;
   email: string;
   otp: OtpDTO;
}
