import { Module } from '@nestjs/common';
import { AllocationService } from './allocation.service';
import { AllocationController } from './allocation.controller';

@Module({
  controllers: [AllocationController],
  providers: [AllocationService],
})
export class AllocationModule {}
