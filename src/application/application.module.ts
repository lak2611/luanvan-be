import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { Application } from 'src/entities/Application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Round } from 'src/entities/Round';
import { File } from 'src/entities/File';
import { DocType } from 'src/entities/DocType';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application, Round, File, DocType]),
    MailModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
