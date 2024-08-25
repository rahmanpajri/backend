import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { Source } from './entities/source.entity';
import { Category } from '../category/entities/category.entity';
import { Region } from '../region/entities/region.entity';
import { Allocation } from '../allocation/entities/allocation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Source, Category, Region, Allocation]),
  ],
  providers: [SourceService],
  controllers: [SourceController],
  exports: [SourceService],
})
export class SourceModule {}
