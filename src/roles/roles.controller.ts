import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() body: { roleName: string; sourceId: number }): Promise<Role> {
    const { roleName, sourceId } = body;
    return this.rolesService.create(roleName, sourceId);
  }

  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: { roleName: string; sourceId: number }): Promise<Role> {
    const { roleName, sourceId } = body;
    return this.rolesService.update(id, roleName, sourceId);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.rolesService.remove(id);
  }
}
