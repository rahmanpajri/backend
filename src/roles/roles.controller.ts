import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() body: { roleName: string, sourceId?: number }): Promise<Role> {
    const { roleName, sourceId } = body;
    return this.rolesService.create(roleName, sourceId);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: { roleName: string, sourceId?: number }): Promise<Role> {
    const { roleName, sourceId } = body;
    return this.rolesService.update(id, roleName, sourceId);
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.rolesService.remove(id);
  }

  @Get(':roleName/source')
  async getSourceByRole(@Param('roleName') roleName: string) {
    const source = await this.rolesService.findSourceByRole(roleName);
    return source;
  }
}
