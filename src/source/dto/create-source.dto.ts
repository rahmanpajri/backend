import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class CreateSourceDto {
  @IsNotEmpty()
  @IsString()
  sourceName: string;

  @IsNotEmpty()
  category: Category;
}
