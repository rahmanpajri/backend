import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { Deposit } from './entities/deposit.entity';

@Injectable()
export class DepositsService {
  constructor(
    @InjectRepository(Deposit)
    private readonly depositRepository: Repository<Deposit>,
  ) {}

  async create(createDepositDto: CreateDepositDto): Promise<Deposit> {
    const deposit = this.depositRepository.create(createDepositDto);
    return this.depositRepository.save(deposit);
  }

  async findAll(): Promise<Deposit[]> {
    return this.depositRepository.find({ relations: ['source'] });
  }

  async findOne(id: number): Promise<Deposit> {
    return this.depositRepository.findOne({where: { id },relations: ['source'],});
  }

  async update(id: number, updateDepositDto: UpdateDepositDto): Promise<Deposit> {
    await this.depositRepository.update(id, updateDepositDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.depositRepository.delete(id);
  }
}
