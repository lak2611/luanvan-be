import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Application } from './Application';
import { DocType } from './DocType';
import { Sponsor } from './Sponsor';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  fileId: number;

  @ManyToOne(() => Application, (application) => application.files, {
    onDelete: 'CASCADE',
  })
  application: Application;

  @ManyToOne(() => Sponsor, (sponsor) => sponsor.files, {
    onDelete: 'CASCADE',
  })
  sponsor: Sponsor;

  @Column()
  url: string;

  @ManyToOne(() => DocType, (doctype) => doctype.files, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  doctype: DocType;
}
