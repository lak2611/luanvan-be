import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/entities/Application';
import { Comment } from 'src/entities/Comment';
import { Nonstudent } from 'src/entities/Nonstudent';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Comment, Nonstudent])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
