import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RegionService } from './region.service';
import { Region } from './entities/region.entity';
import { UpdateRegionDto } from './dto/update-region.dto';

@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  async create(@Body() region: Partial<Region>): Promise<Region> {
    return this.regionService.create(region);
  }

  @Get()
  async findAll(): Promise<Region[]> {
    return this.regionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Region> {
    return this.regionService.findOne(id);
  }

  @Put(':id')
async updateRegion(@Param('id') id: number, @Body() updateRegionDto: UpdateRegionDto) {
  return this.regionService.update(id, updateRegionDto);
}

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.regionService.remove(id);
  }
}
