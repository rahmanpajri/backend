import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Allocation } from './entities/allocation.entity';

@Injectable()
export class AllocationService {
  constructor(
    @InjectRepository(Allocation)
    private readonly allocationRepository: Repository<Allocation>,
  ) {}

  async create(createAllocationDto: Partial<Allocation>): Promise<Allocation> {
    const allocation = this.allocationRepository.create(createAllocationDto);
    return this.allocationRepository.save(allocation);
  }

  async findAll(): Promise<Allocation[]> {
    return this.allocationRepository.find({ relations: ['source', 'region'] });
  }

  async findOne(id: number): Promise<Allocation> {
    return this.allocationRepository.findOne({where: { id }, relations: ['source', 'region'],});
  }

  async update(id: number, updateAllocationDto: Partial<Allocation>): Promise<Allocation> {
    await this.allocationRepository.update(id, updateAllocationDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.allocationRepository.delete(id);
  }
}
