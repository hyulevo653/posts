import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator'; 
import { Column } from 'typeorm';
export class LoginUserDto {
  @ApiProperty({example: 'duchuy@gmail.com'})
  
  @IsEmail()
  email: string;
  
  @ApiProperty({example: '123456'})
  @IsNotEmpty()
  password: string;
}