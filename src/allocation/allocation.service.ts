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
    return this.allocationRepository.find();
  }

  async findOne(id: number): Promise<Allocation> {
    return this.allocationRepository.findOneBy({ id });
  }

  async getNewId(): Promise<number> {
    try {
      const result = await this.allocationRepository
        .createQueryBuilder('allocation')
        .select('MAX(allocation.id)', 'maxId')
        .getRawOne();
      
      const maxId = result?.maxId ? Number(result.maxId) : 0;
  
      return maxId + 1;
    } catch (error) {
      console.error('Error fetching new ID:', error);
      throw new Error('Could not fetch new ID');
    }
  }
  

  async update(id: number, updateAllocationDto: Partial<Allocation>): Promise<Allocation> {
    await this.allocationRepository.update(id, updateAllocationDto);
    return this.allocationRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.allocationRepository.delete(id);
  }
}
