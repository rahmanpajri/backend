import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AllocationService } from './allocation.service';
import { Allocation } from './entities/allocation.entity';

@Controller('allocations')
export class AllocationController {
  constructor(private readonly allocationService: AllocationService) {}

  @Post()
  create(@Body() createAllocationDto: Partial<Allocation>) {
    return this.allocationService.create(createAllocationDto);
  }

  @Get()
  findAll() {
    return this.allocationService.findAll();
  }

  @Get('new')
  async newId() {
    return this.allocationService.getNewId();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.allocationService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAllocationDto: Partial<Allocation>) {
    return this.allocationService.update(id, updateAllocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.allocationService.remove(id);
  }
}
