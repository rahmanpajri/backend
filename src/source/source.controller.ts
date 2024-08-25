import {Controller, Get, Post, Put, Delete, Body, Param, NotFoundException} from '@nestjs/common';
import { SourceService } from './source.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';

@Controller('sources')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Get()
  async findAll() {
    return this.sourceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const source = await this.sourceService.findOne(+id);
    if (!source) {
      throw new NotFoundException('Source not found');
    }
    return source;
  }

  @Post()
  async create(@Body() createSourceDto: CreateSourceDto) {
    return this.sourceService.create(createSourceDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSourceDto: UpdateSourceDto,
  ) {
    return this.sourceService.update(+id, updateSourceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sourceService.remove(+id);
  }
}
