import { Injectable } from '@nestjs/common';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import * as path from 'path';
import * as fs from 'fs';
import { hashObject } from 'src/application/application.service';
import { File } from 'src/entities/File';
import { InjectRepository } from '@nestjs/typeorm';
import { Sponsor } from 'src/entities/Sponsor';
import { Repository } from 'typeorm';
import { makeRes } from 'src/utils/makeRes';

@Injectable()
export class SponsorService {
  constructor(
    @InjectRepository(Sponsor)
    private sponsorRepository: Repository<Sponsor>,
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async create(
    createSponsorDto: CreateSponsorDto,
    files: Array<Express.Multer.File>,
  ) {
    //save file
    const fileEntities = [];
    const saveDirectory = path.join(__dirname, '..', '..', 'userAssets');
    for (const file of files) {
      // save file
      const fileName = hashObject(file) + file.mimetype.replace('image/', '.');
      const filePath = path.join(saveDirectory, fileName);
      fs.writeFileSync(filePath, file.buffer);
      // create entity
      const fileEntity = this.fileRepository.create({
        url: filePath.split('/').slice(-1)[0],
      });
      fileEntities.push(fileEntity);
    }
    // create sponsor
    const sponsor = this.sponsorRepository.create(createSponsorDto);
    sponsor.files = fileEntities;
    await this.sponsorRepository.save(sponsor);
    return makeRes('success', 'success');
  }

  async findAll() {
    const res = await this.sponsorRepository.find({
      relations: ['files'],
    });
    return makeRes(res, 'success');
  }

  findOne(id: number) {
    return `This action returns a #${id} sponsor`;
  }

  update(id: number, updateSponsorDto: UpdateSponsorDto) {
    return `This action updates a #${id} sponsor`;
  }

  remove(id: number) {
    return `This action removes a #${id} sponsor`;
  }
}
