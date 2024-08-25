// source.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SourceService } from './source.service';
import { Source } from './entities/source.entity';

@Controller('sources')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Post()
  create(@Body() createSourceDto: any) {
    return this.sourceService.create(createSourceDto);
  }

  @Get()
  findAll() {
    return this.sourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sourceService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateSourceDto: any) {
    return this.sourceService.update(id, updateSourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sourceService.remove(id);
  }
}
