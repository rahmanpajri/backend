import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { Deposit } from './entities/deposit.entity';

@Controller('deposits')
export class DepositsController {
  constructor(private readonly depositsService: DepositsService) {}

  @Post()
  async create(@Body() body: { userId: number, month: number, year: number, amount: number, source: { id: number } }): Promise<Deposit> {
    const depositData = {
      userId: Number(body.userId),
      month: Number(body.month),
      year: Number(body.year),
      amount: Number(body.amount),
      source: body.source.id
    };

    return this.depositsService.create(depositData);
  }

  @Get()
  async findAll(): Promise<Deposit[]> {
    return this.depositsService.findAll();
  }

  @Get('years')
  async findYears() {
    return this.depositsService.findDistinctYears();
  }

  @Get('report')
  async getDepositsReport() {
    return this.depositsService.getDepositsReport();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Deposit> {
    return this.depositsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: { month: number, year: number, amount: number }): Promise<Deposit> {
    const updateData = {
      month: Number(body.month),
      year: Number(body.year),
      amount: Number(body.amount),
    };

    return this.depositsService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.depositsService.remove(id);
  }
}
