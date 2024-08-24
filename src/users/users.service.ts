import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RolesService,
  ) {}

  async create(username: string, fullName: string, password: string, roleId: number): Promise<User> {
    const role = await this.roleService.findOne(roleId);
    const user = this.userRepository.create({ username, fullName, password, role });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['role'] });
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username }, relations: ['role'] });
  }

  async update(id: number, username: string, fullName: string, password: string, roleId: number): Promise<User> {
    const role = await this.roleService.findOne(roleId);
    await this.userRepository.update(id, { username, fullName, password, role });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
