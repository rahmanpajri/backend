import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Source } from '../../source/entities/source.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @OneToMany(() => Source, (source) => source.category)
  sources: Source[];
}
