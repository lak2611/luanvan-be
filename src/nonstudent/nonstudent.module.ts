import { Module } from '@nestjs/common';
import { NonstudentService } from './nonstudent.service';
import { NonstudentController } from './nonstudent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nonstudent } from 'src/entities/Nonstudent';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Nonstudent]), MailModule],
  controllers: [NonstudentController],
  providers: [NonstudentService],
  exports: [NonstudentService],
})
export class NonstudentModule {}
