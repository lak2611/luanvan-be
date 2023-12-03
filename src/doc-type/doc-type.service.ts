import { Injectable } from '@nestjs/common';
import { CreateDocTypeDto } from './dto/create-doc-type.dto';
import { UpdateDocTypeDto } from './dto/update-doc-type.dto';
import { DocType } from 'src/entities/DocType';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { makeRes } from 'src/utils/makeRes';

@Injectable()
export class DocTypeService {
  constructor(
    @InjectRepository(DocType)
    private docTypeRepository: Repository<DocType>,
  ) {}

  async create(createDocTypeDto: CreateDocTypeDto) {
    await this.docTypeRepository.save(createDocTypeDto);
    return makeRes('success', 'DocType created successfully');
  }

  async findAll() {
    const docTypes = await this.docTypeRepository.find();
    return makeRes(docTypes, 'success');
  }

  findOne(id: number) {
    return `This action returns a #${id} docType`;
  }

  async update(id: number, updateDocTypeDto: UpdateDocTypeDto) {
    await this.docTypeRepository.update(id, updateDocTypeDto);
    return `This action updates a #${id} docType`;
  }

  async remove(id: number) {
    await this.docTypeRepository.delete(id);
    return makeRes('success', 'DocType deleted successfully');
  }
}
