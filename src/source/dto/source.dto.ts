import { AllocationDto } from "src/allocation/dto/allocation.dto";
import { CategoryDto } from "src/category/dto/category.dto";

export class SourceDto {
  id: number;
  sourceName: string;
  allocations: AllocationDto[];
  category: CategoryDto;
}