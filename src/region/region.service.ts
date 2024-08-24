import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}

  async create(region: Partial<Region>): Promise<Region> {
    const newRegion = this.regionRepository.create(region);
    return this.regionRepository.save(newRegion);
  }

  async findAll(): Promise<Region[]> {
    return this.regionRepository.find({ relations: ['allocations'] });
  }

  async findOne(id: number): Promise<Region> {
    return this.regionRepository.findOne({where: { id }, relations: ['allocations'],});
  }

  async update(id: number, region: Partial<Region>): Promise<Region> {
    await this.regionRepository.update(id, region);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.regionRepository.delete(id);
  }
}
