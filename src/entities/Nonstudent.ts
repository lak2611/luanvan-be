import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from './Comment';

@Entity()
export class Nonstudent {
  @PrimaryGeneratedColumn()
  nonstudentId: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  fullname: string;

  @Column({ nullable: true })
  birthday: Date;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => Comment, (comment) => comment.nonstudent)
  comments: Comment[];
}
