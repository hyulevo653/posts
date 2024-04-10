import { Exclude } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator'; 
import { Column } from 'typeorm';
export class RegisterUserDto {

  @IsEmail()
  email: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  password: string;
}