import { IsOptional, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class UpdateSourceDto {
  @IsOptional()
  @IsString()
  sourceName?: string;

  @IsOptional()
  category?: Category;
}
