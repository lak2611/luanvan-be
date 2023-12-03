import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from './File';
import { Round } from './Round';

@Entity({
  name: 'DocType',
})
export class DocType {
  @PrimaryGeneratedColumn()
  doctypeId: number;

  @Column()
  title: string;

  @OneToMany(() => File, (file) => file.doctype, {
    onDelete: 'CASCADE',
  })
  files: File[];

  @ManyToMany(() => Round, (round) => round.doctypes, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  rounds: Round[];
}
