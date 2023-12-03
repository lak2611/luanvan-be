import { Module } from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { SponsorController } from './sponsor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sponsor } from 'src/entities/Sponsor';
import { File } from 'src/entities/File';

@Module({
  imports: [TypeOrmModule.forFeature([Sponsor, File])],
  controllers: [SponsorController],
  providers: [SponsorService],
})
export class SponsorModule {}
