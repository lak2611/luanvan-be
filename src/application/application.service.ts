import { Injectable } from '@nestjs/common';
import { UpdateApplicationDto } from './dto/update-application.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { Application } from 'src/entities/Application';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Round } from 'src/entities/Round';
import { makeRes } from 'src/utils/makeRes';
import { DocType } from 'src/entities/DocType';
import { File } from 'src/entities/File';
import { CreateApplicationDto } from './dto/create-application.dto';
import { MailService } from 'src/mail/mail.service';

export function hashObject(obj: any) {
  const jsonString = JSON.stringify(obj);
  const fullHash = crypto.createHash('md5').update(jsonString).digest('hex');
  const shortHash = fullHash.substring(0, 8); // Take the first 8 characters
  return shortHash;
}

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(Round)
    private roundRepository: Repository<Round>,
    @InjectRepository(DocType)
    private docTypeRepository: Repository<DocType>,
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private readonly mailService: MailService,
  ) {}

  async create(data: CreateApplicationDto, files: any) {
    const doctypes = await this.docTypeRepository.find();
    const round = await this.roundRepository.findOne({
      where: { year: data.year },
    });
    try {
      //save file
      const fileEntities = [];
      const saveDirectory = path.join(__dirname, '..', '..', 'userAssets');
      for (const file of files) {
        // save file
        const fileName =
          hashObject(file) + file.mimetype.replace('image/', '.');
        const filePath = path.join(saveDirectory, fileName);
        fs.writeFileSync(filePath, file.buffer);
        // create entity
        const fileEntity = this.fileRepository.create({
          url: filePath.split('/').slice(-1)[0],
        });
        fileEntity.doctype = doctypes.find(
          (docType) => docType.doctypeId == file.fieldname,
        );
        fileEntities.push(fileEntity);
      }
      //create application
      const application = this.applicationRepository.create(data);
      application.files = fileEntities;
      application.round = round;
      const createdApplication =
        await this.applicationRepository.save(application);
      if (application.email)
        await this.mailService.sendNewApplicationMail(
          application?.email,
          createdApplication.applicationId,
        );
      return makeRes('success', 'Application created successfully');
    } catch (error) {
      return makeRes(null, error.message);
    }
  }

  findAll() {
    return `This action returns all application`;
  }

  async findOne(id: number) {
    try {
      const res = await this.applicationRepository.findOne({
        where: { applicationId: id },
        relations: [
          'files',
          'files.doctype',
          'round',
          'comments',
          'comments.nonstudent',
        ],
      });
      res.comments.forEach((comment) => {
        delete comment.nonstudent.password;
      });
      return makeRes(res, 'success');
    } catch (error) {
      return makeRes(null, error.message);
    }
  }

  async findByYear(year: number) {
    const res = await this.applicationRepository.find({
      where: {
        round: {
          year: year,
        },
      },
      relations: ['files', 'files.doctype'],
    });
    return makeRes(res, 'success');
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  async updateStatus(id: number, status: string) {
    const application = await this.applicationRepository.findOne({
      where: { applicationId: id },
    });
    if (!application) {
      return makeRes(null, 'Application not found');
    }
    application.status = status;
    await this.applicationRepository.save(application);
    return makeRes('success', 'Application updated successfully');
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
