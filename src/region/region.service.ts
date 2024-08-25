import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './entities/region.entity';
import { UpdateRegionDto } from './dto/update-region.dto';

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

  async update(id: number, updateRegionDto: UpdateRegionDto): Promise<Region> {
    await this.regionRepository.update(id, updateRegionDto); 
    return this.regionRepository.findOne({ where: { id } });
  }
  

  async remove(id: number): Promise<void> {
    await this.regionRepository.delete(id);
  }
}
