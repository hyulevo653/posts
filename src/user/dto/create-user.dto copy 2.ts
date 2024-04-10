import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator'; 
import { Column } from 'typeorm';
export class CreateUserDto {

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}