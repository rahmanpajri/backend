import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['sources'] });
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne({where: { id }, relations: ['sources'],});
  }

  async create(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  async update(id: number, category: Partial<Category>): Promise<Category> {
    await this.categoryRepository.update(id, category);
    return this.categoryRepository.findOne({where: { id }, relations: ['sources'],});
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
