import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Application } from 'src/entities/Application';
import { Comment } from 'src/entities/Comment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { makeRes } from 'src/utils/makeRes';
import { Nonstudent } from 'src/entities/Nonstudent';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Nonstudent)
    private nonstudentRepository: Repository<Nonstudent>,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: any) {
    const application = await this.applicationRepository.findOne({
      where: { applicationId: createCommentDto.applicationId },
      relations: ['comments'],
    });
    if (!application) {
      return makeRes(false, 'Application not found', true);
    }
    const comment = new Comment();
    if (!application.comments) {
      application.comments = [];
    }
    comment.application = application;
    comment.content = createCommentDto.content;
    //
    const nonstudent = await this.nonstudentRepository.findOne({
      where: { username: user.username },
    });
    comment.nonstudent = nonstudent;
    application.comments.push(comment);

    await this.applicationRepository.save(application);
    return makeRes(true, 'Comment created', false);
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
