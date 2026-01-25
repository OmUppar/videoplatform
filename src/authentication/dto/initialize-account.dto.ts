import { IsEmail, IsNotEmpty } from 'class-validator';

export class InitializeAccountDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
