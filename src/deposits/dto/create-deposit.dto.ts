import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Source } from 'src/source/entities/source.entity';


export class CreateDepositDto {
  @IsInt()
  @IsNotEmpty()
  month: number;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  source?: Source;
}
