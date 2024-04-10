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
  
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;
  @Column()
  firstName : string;
  @Column()
  lastName: string;

  @Column({default: ROLES.USER})
  @Exclude()
  role : ROLES
}