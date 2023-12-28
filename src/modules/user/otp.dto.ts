export interface OtpDTO {
   value: string;
   expired: boolean;
   expDate: Date;
}

export function createOtpDto(
   value: string,
   expired: boolean,
   expDate: Date,
): OtpDTO {
   return { value, expired, expDate };
}
