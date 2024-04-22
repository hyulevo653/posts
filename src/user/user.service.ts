import { Body, Get, Injectable, Param, Post, Put,Delete, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findByEmail(email: string){
    return this.usersRepository.findOneBy({email});
  }

  async findOne(id: number): Promise<User> {
   return this.usersRepository.findOne({ where: { id } });
  }

  async create(requestBody: RegisterUserDto) {
    const user = this.usersRepository.create(requestBody);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<User> {
    // let user = await this.findOne(id);
    // if(!user){
    //   throw new NotFoundException('User does not exist');
    // }
    // user = {...user,...updateUserDto}
    // return this.usersRepository.save(user)
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne({where : {id }});
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findAllPaginated(page: number, perPage: number): Promise<{ data: User[], total: number }> {
    const [data, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
    });
    return { data, total };
  }
}