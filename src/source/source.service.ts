// source.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Source } from './entities/source.entity';
import { Category } from '../category/entities/category.entity';
import { Region } from '../region/entities/region.entity';
import { Allocation } from '../allocation/entities/allocation.entity';

@Injectable()
export class SourceService {
  constructor(
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
    @InjectRepository(Allocation)
    private readonly allocationRepository: Repository<Allocation>,
  ) {}

  async create(createSourceDto: any) {
    const { sourceName, categoryId, allocations } = createSourceDto;
  
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
  
    const source = new Source();
    source.sourceName = sourceName;
    source.category = category;
  
    const savedSource = await this.sourceRepository.save(source);
  
    const allocationEntities = await Promise.all(
      allocations.map(async (allocationDto: any) => {
        const regionId = Number(allocationDto.region.id);
        const region = await this.regionRepository.findOne({ where: { id: regionId } });
        if (!region) {
          throw new NotFoundException(`Region with ID ${regionId} not found`);
        }
  
        const allocation = new Allocation();
        allocation.percentage = Number(allocationDto.percentage);
        allocation.region = region;
        allocation.source = savedSource;
  
        return allocation;
      })
    );
  
    await this.allocationRepository.save(allocationEntities);
  
    return savedSource;
  }

  async findAll() {
    return this.sourceRepository.find({
      relations: ['category', 'allocations', 'allocations.region'],
    });
  }

  async findOne(id: number) {
    const source = await this.sourceRepository.findOne({
      where: { id },
      relations: ['category', 'allocations', 'allocations.region']
    });
    if (!source) {
      throw new NotFoundException(`Source with ID ${id} not found`);
    }
    return source;
  }

async update(id: number, updateSourceDto: any) {
  const source = await this.sourceRepository.findOne({
    where: { id },
    relations: ['allocations', 'allocations.region'],
  });

  if (!source) {
    throw new NotFoundException(`Source with ID ${id} not found`);
  }

  source.sourceName = updateSourceDto.sourceName;

  const category = await this.categoryRepository.findOne({ where: { id: updateSourceDto.categoryId } });
  if (!category) {
    throw new NotFoundException(`Category with ID ${updateSourceDto.categoryId} not found`);
  }
  source.category = category;

  // Handle allocations
  const updatedAllocations = await Promise.all(
    updateSourceDto.allocations.map(async (allocationDto: any) => {
      const regionId = Number(allocationDto.region.id);
      const region = await this.regionRepository.findOne({ where: { id: regionId } });
      if (!region) {
        throw new NotFoundException(`Region with ID ${regionId} not found`);
      }

      let allocation = source.allocations.find(a => a.id === allocationDto.id);
      if (!allocation) {
        allocation = new Allocation();
        allocation.source = source;
      }

      allocation.percentage = Number(allocationDto.percentage);
      allocation.region = region;

      return allocation;
    })
  );

  const allocationIdsToKeep = updatedAllocations.map(a => a.id);
  const allocationsToRemove = source.allocations.filter(a => !allocationIdsToKeep.includes(a.id));
  await this.allocationRepository.remove(allocationsToRemove);

  await this.allocationRepository.save(updatedAllocations);

  return this.sourceRepository.save(source);
}

  

async remove(id: number) {
  const source = await this.sourceRepository.findOne({ where: { id }, relations: ['allocations'] });
  if (!source) {
    throw new NotFoundException(`Source with ID ${id} not found`);
  }
  // Hapus alokasi terkait
  await this.allocationRepository.delete({ source: { id } });
  // Hapus source
  await this.sourceRepository.remove(source);
  return { deleted: true };
}
}
