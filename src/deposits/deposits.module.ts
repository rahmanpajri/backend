import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposit } from './entities/deposit.entity';
import { DepositsService } from './deposits.service';
import { DepositsController } from './deposits.controller';
import { Source } from 'src/source/entities/source.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deposit, Source, User])],
  providers: [DepositsService],
  controllers: [DepositsController],
})
export class DepositsModule {}
