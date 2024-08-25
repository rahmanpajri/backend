import { RegionDto } from 'src/region/dto/region.dto';



export class AllocationDto {
  id: number;
  percentage: number;
  region: RegionDto;
}