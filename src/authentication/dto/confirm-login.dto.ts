import { IsEmail } from 'class-validator';

export class ConfirmLoginDto {
  @IsEmail()
  email: string;
}
