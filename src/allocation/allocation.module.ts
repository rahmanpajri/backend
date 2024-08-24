import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allocation } from './entities/allocation.entity';
import { AllocationService } from './allocation.service';
import { AllocationController } from './allocation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Allocation])],
  controllers: [AllocationController],
  providers: [AllocationService],
})
export class AllocationModule {}
