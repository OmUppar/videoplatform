import { IsEmail } from 'class-validator';

export class InitializeAccountDto {
  @IsEmail()
  email: string;
}
