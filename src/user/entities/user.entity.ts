import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, Exclusion, PrimaryGeneratedColumn } from 'typeorm';

enum ROLES  {
  ADMIN = 'ADMIN',
  MOD = 'MOD',
  USER = 'USER'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ default: 'default@example.com' })
  @ApiProperty({example: 'duchuy@gmail.com'})
  email: string;

  @Column({ default: '123456' })
  @ApiProperty({example: '123456'})
  @Exclude()
  password: string;
  @Column({ nullable: true })
  @ApiProperty({example: 'Duc'})
  firstName : string;
  @Column({ nullable: true })
  @ApiProperty({example: 'Huy'})
  lastName: string;

  @Column({default: ROLES.USER})
  @Exclude()
  role : ROLES
}