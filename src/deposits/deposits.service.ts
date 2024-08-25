import { Injectable, ForbiddenException } from '@nestjs/common';
import { Deposit } from './entities/deposit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Source } from 'src/source/entities/source.entity';

@Injectable()
export class DepositsService {
  constructor(
    @InjectRepository(Deposit)
    private readonly depositRepository: Repository<Deposit>,
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>
  ) {}

  async create(depositData: { userId: number, month: number, year: number, amount: number, source: number }): Promise<Deposit> {
    try {
      // Fetch the source to ensure it exists
      const source = await this.sourceRepository.findOne({ where: { id: depositData.source } });
      if (!source) {
        throw new ForbiddenException('Source not found.');
      }

      // Create and save the deposit
      const deposit = this.depositRepository.create({
        ...depositData,
        source
      });

      return this.depositRepository.save(deposit);
    } catch (error) {
      console.error('Error creating deposit', error);
      throw error;
    }
  }

  async findAll(): Promise<Deposit[]> {
    return this.depositRepository.find({ relations: ['source'] });
  }

  async findOne(id: number): Promise<Deposit> {
    const deposit = await this.depositRepository.findOne({ where: { id }, relations: ['source'] });
    if (!deposit) {
      throw new ForbiddenException('Deposit not found.');
    }
    return deposit;
  }

  async update(id: number, updateData: { month: number; year: number; amount: number }): Promise<Deposit> {
    try {
      const deposit = await this.depositRepository.findOne({ where: { id }, relations: ['source'] });
      if (!deposit) {
        throw new ForbiddenException('Deposit not found.');
      }
  
      // Update only the month, year, and amount fields
      deposit.month = updateData.month;
      deposit.year = updateData.year;
      deposit.amount = updateData.amount;
  
      return this.depositRepository.save(deposit);
    } catch (error) {
      console.error('Error updating deposit', error);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.depositRepository.delete(id);
    if (result.affected === 0) {
      throw new ForbiddenException('Deposit not found.');
    }
  }
}
