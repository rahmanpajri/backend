import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Post()
  create(@Body('roleName') roleName: string): Promise<Role> {
    return this.roleService.create(roleName);
  }

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('roleName') roleName: string): Promise<Role> {
    return this.roleService.update(id, roleName);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.roleService.remove(id);
  }
}
