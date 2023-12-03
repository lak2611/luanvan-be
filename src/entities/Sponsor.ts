import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { File } from './File';

@Entity()
export class Sponsor {
  @PrimaryGeneratedColumn()
  sponsorId: number;

  @Column()
  fullname: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  money: number;

  @OneToMany(() => File, (file) => file.sponsor, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  files: File[];
}
