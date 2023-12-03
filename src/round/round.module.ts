import { Module } from '@nestjs/common';
import { RoundService } from './round.service';
import { RoundController } from './round.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Round } from 'src/entities/Round';
import { DocType } from 'src/entities/DocType';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Round, DocType]), MailModule],
  controllers: [RoundController],
  providers: [RoundService],
})
export class RoundModule {}
