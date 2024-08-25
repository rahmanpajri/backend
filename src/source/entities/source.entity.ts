import { Allocation } from "src/allocation/entities/allocation.entity";
import { Category } from "src/category/entities/category.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToOne(() => Role, (role) => role.source)
  role: Role;
}