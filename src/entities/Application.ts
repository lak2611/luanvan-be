import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Round } from './Round';
import { File } from './File';
import { Comment } from './Comment';

@Entity({
  name: 'Application',
})
export class Application {
  @PrimaryGeneratedColumn()
  applicationId: number;

  @ManyToOne(() => Round, (round) => round.applications, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  round: Round;

  @Column()
  fullname: string;

  @Column()
  birthday: Date;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  family: string;

  @Column()
  healthStatus: string;

  @Column()
  hometown: string;

  @Column()
  university: string;

  @Column()
  major: string;

  @Column()
  careerGoal: string;

  @Column()
  scholarEssay: string;

  @Column({
    default: 'pending',
  })
  status: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @OneToMany(() => File, (file) => file.application, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  files: File[];

  @OneToMany(() => Comment, (comment) => comment.application, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Comment[];
}
