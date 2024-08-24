import { Allocation } from 'src/allocation/entities/allocation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  regionName: string;

  @OneToMany(() => Allocation, (allocation) => allocation.region)
  allocations: Allocation[];
}
