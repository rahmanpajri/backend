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
      const source = await this.sourceRepository.findOne({ where: { id: depositData.source } });
      if (!source) {
        throw new ForbiddenException('Source not found.');
      }

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

  async findDistinctYears(): Promise<number[]> {
    const deposits = await this.depositRepository.find();
    const years = deposits.map(deposit => deposit.year);
    const distinctYears = [...new Set(years)];
    distinctYears.sort((a, b) => a - b);
    return distinctYears;
  }

  async getDepositsReport(): Promise<Deposit[]> {
    return this.depositRepository.find({
      relations: ['source', 'source.allocations', 'source.allocations.region'],
    });
  }
}
