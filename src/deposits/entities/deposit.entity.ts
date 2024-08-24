import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Source } from 'src/source/entities/source.entity';

@Entity('deposit')
export class Deposit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @ManyToOne(() => Source, (source) => source.id)
  source: Source;
}
