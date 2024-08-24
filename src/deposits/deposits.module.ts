import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposit } from './entities/deposit.entity';
import { DepositsService } from './deposits.service';
import { DepositController } from './deposits.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deposit])],
  providers: [DepositsService],
  controllers: [DepositController],
})
export class DepositsModule {}
