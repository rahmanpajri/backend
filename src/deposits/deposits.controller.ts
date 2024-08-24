import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { DepositsService } from './deposits.service';

@Controller('deposits')
export class DepositController {
  constructor(private readonly depositService: DepositsService) {}

  @Post()
  async create(@Body() createDepositDto: CreateDepositDto) {
    return this.depositService.create(createDepositDto);
  }

  @Get()
  async findAll() {
    return this.depositService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.depositService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDepositDto: UpdateDepositDto) {
    return this.depositService.update(id, updateDepositDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.depositService.remove(id);
  }
}
