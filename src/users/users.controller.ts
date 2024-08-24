import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jw.auth.gurad';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body('username') username: string,
    @Body('fullName') fullName: string,
    @Body('password') password: string,
    @Body('roleId') roleId: number,
  ): Promise<User> {
    return this.userService.create(username, fullName, password, roleId);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body('username') username: string,
    @Body('fullName') fullName: string,
    @Body('password') password: string,
    @Body('roleId') roleId: number,
  ): Promise<User> {
    return this.userService.update(id, username, fullName, password, roleId);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}