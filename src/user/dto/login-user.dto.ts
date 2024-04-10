import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator'; 
import { Column } from 'typeorm';
export class LoginUserDto {

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}