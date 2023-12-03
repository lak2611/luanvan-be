import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Application } from './Application';
import { DocType } from './DocType';

@Entity({
  name: 'Round',
})
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: false })
  publicResult: boolean;

  @Column({ length: 5000 })
  description: string;

  @OneToMany(() => Application, (application) => application.round)
  applications: Application[];

  @ManyToMany(() => DocType, (doctype) => doctype.rounds, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  doctypes: DocType[];
}
