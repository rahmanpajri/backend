import { Source } from 'src/source/entities/source.entity';
import { User } from './../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  roleName: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToOne(() => Source, (source) => source.roles, { nullable: true })
  source: Source;
}