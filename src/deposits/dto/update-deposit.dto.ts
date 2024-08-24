import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateDepositDto {
  @IsInt()
  @IsOptional()
  month?: number;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;
}
