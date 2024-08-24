import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Source } from './entities/source.entity';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';

@Injectable()
export class SourceService {
  constructor(
    @InjectRepository(Source)
    private sourceRepository: Repository<Source>,
  ) {}

  async create(createSourceDto: CreateSourceDto): Promise<Source> {
    const source = this.sourceRepository.create(createSourceDto);
    return this.sourceRepository.save(source);
  }

  async findAll(): Promise<Source[]> {
    return this.sourceRepository.find({ relations: ['category', 'allocations'] });
  }

  async findOne(id: number): Promise<Source> {
    const source = await this.sourceRepository.findOne({
      where: { id },
      relations: ['category', 'allocations'],
    });
    if (!source) {
      throw new NotFoundException(`Source with ID ${id} not found`);
    }
    return source;
  }

  async update(id: number, updateSourceDto: UpdateSourceDto): Promise<Source> {
    const source = await this.sourceRepository.preload({
      id: id,
      ...updateSourceDto,
    });
    if (!source) {
      throw new NotFoundException(`Source with ID ${id} not found`);
    }
    return this.sourceRepository.save(source);
  }

  async remove(id: number): Promise<void> {
    const result = await this.sourceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Source with ID ${id} not found`);
    }
  }
}
