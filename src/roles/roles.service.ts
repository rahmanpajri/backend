import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Source } from 'src/source/entities/source.entity'; // Adjust the import path as needed

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
    return this.roleRepository.findOneBy({ id });
  }

  async update(id: number, roleName: string, sourceId?: number): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id });

    if (role) {
      role.roleName = roleName;

      if (sourceId) {
        const source = await this.sourceRepository.findOneBy({ id: sourceId });
        if (source) {
          role.source = source;
        }
      }

      await this.roleRepository.save(role);
    }

    return role;
  }

  async remove(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
