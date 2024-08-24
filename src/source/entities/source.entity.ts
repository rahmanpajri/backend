import { Allocation } from "src/allocation/entities/allocation.entity";
import { Category } from "src/category/entities/category.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Source {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sourceName: string;

  @ManyToOne(() => Category, (category) => category.sources)
  category: Category;

  @OneToMany(() => Allocation, (allocation) => allocation.source)
  allocations: Allocation[];
}