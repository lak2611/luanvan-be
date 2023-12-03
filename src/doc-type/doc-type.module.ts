import { Module } from '@nestjs/common';
import { DocTypeService } from './doc-type.service';
import { DocTypeController } from './doc-type.controller';
import { DocType } from 'src/entities/DocType';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DocType])],
  controllers: [DocTypeController],
  providers: [DocTypeService],
})
export class DocTypeModule {}
