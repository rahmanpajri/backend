import { Region } from 'src/region/entities/region.entity';
import { Source } from 'src/source/entities/source.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Allocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 5, scale: 2 })
  percentage: number;

  @ManyToOne(() => Source, (source) => source.allocations)
  source: Source;

  @ManyToOne(() => Region, (region) => region.allocations)
  region: Region;
}
