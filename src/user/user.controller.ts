import { Body, Controller, Get, Param, Post, Put, Delete, UseInterceptors, UploadedFile, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { Repository } from 'typeorm';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ): Promise<{ status: number, msg: string, data: User[], paging: { page: number, perPage: number, total: number, totalPage: number }}> {
    const { data, total } = await this.usersService.findAllPaginated(page, perPage);
    const totalPage = Math.ceil(total / perPage);
    return {
      status: 200,
      msg: 'Success',
      data,
      paging: {
        page,
        perPage,
        total,
        totalPage,
      }
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'Tạo mới user thành công.' })
  createUser(@Body() requestBody: User) :Promise<User> {
    return this.usersService.create(requestBody);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'Cập nhật user thành công.' })
  update(@Param('id') id: string, @Body() updateUserDto: User): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}