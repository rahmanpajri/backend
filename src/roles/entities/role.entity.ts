import { Source } from 'src/source/entities/source.entity';
import { User } from './../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  roleName: string;

  @OneToOne(() => Source, (source) => source.role)
  @JoinColumn()
  source: Source;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}