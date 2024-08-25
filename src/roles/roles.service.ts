import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Source } from './../source/entities/source.entity'; // Adjust the import path

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
  ) {}

  async create(roleName: string, sourceId?: number): Promise<Role> {
    const role = this.roleRepository.create({ roleName });

    if (sourceId) {
      const source = await this.sourceRepository.findOneBy({ id: sourceId });
      if (source) {
        role.source = source;
      }
    }

    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['source'] });
  }

  async findOne(id: number): Promise<Role> {
    return this.roleRepository.findOne({ where: { id }, relations: ['source'] });
  }

  async update(id: number, roleName: string, sourceId?: number): Promise<Role> {
    const role = await this.findOne(id);
    if (!role) {
      throw new Error('Role not found');
    }

    role.roleName = roleName;

    if (sourceId) {
      const source = await this.sourceRepository.findOneBy({ id: sourceId });
      if (source) {
        role.source = source;
      }
    }

    await this.roleRepository.save(role);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }

  async findSourceByRole(roleName: string): Promise<Source> {
    const role = await this.roleRepository.findOne({
      where: { roleName },
      relations: ['source'],
    });
  
    if (!role) {
      throw new NotFoundException(`Role with name ${roleName} not found`);
    }
  
    return role.source;
  }
}
