import { Injectable } from '@nestjs/common';
import { CreateNonstudentDto } from './dto/create-nonstudent.dto';
import { UpdateNonstudentDto } from './dto/update-nonstudent.dto';
import { Nonstudent } from 'src/entities/Nonstudent';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { makeRes } from 'src/utils/makeRes';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcrypt';

const generatePassword = () => {
  const length = 8;
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

@Injectable()
export class NonstudentService {
  constructor(
    @InjectRepository(Nonstudent)
    private nonstudentRepository: Repository<Nonstudent>,
    private readonly mailService: MailService,
  ) {}

  async create(createNonstudentDto: CreateNonstudentDto) {
    try {
      //check if email already exists
      const nonstudent = await this.nonstudentRepository.findOne({
        where: { email: createNonstudentDto.email },
      });
      if (nonstudent) {
        return makeRes('error', 'Email này đã được sử dụng', true);
      }
      //generate password
      const password = generatePassword();
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      createNonstudentDto.password = hash;
      //create nonstudent
      await this.nonstudentRepository.save(createNonstudentDto);
      await this.mailService.sendNewAccountMail(
        createNonstudentDto.email,
        createNonstudentDto.username,
        password,
      );
      return makeRes('success', 'Nonstudent created successfully');
    } catch (error) {
      return makeRes('error', error.message);
    }
  }

  findAll() {
    return `This action returns all nonstudent`;
  }

  async findOne(id: number) {
    const res = await this.nonstudentRepository.findOne({
      where: { nonstudentId: id },
    });
    return makeRes(res, 'Nonstudent found');
  }

  async findByUsername(username: string) {
    const res = await this.nonstudentRepository.findOne({
      where: { username: username },
    });
    delete res.password;
    return makeRes(res, 'Nonstudent found');
  }

  async updateByUsername(
    username: string,
    updateNonstudentDto: UpdateNonstudentDto,
  ) {
    console.log(
      '🚀 ~ file: nonstudent.service.ts:80 ~ NonstudentService ~ updateNonstudentDto:',
      updateNonstudentDto,
    );

    await this.nonstudentRepository.update({ username }, updateNonstudentDto);
    return makeRes('success', 'Nonstudent updated successfully');
  }

  async update(id: number, updateNonstudentDto: UpdateNonstudentDto) {
    await this.nonstudentRepository.update(id, updateNonstudentDto);
    return makeRes('success', 'Nonstudent updated successfully');
  }

  remove(id: number) {
    return `This action removes a #${id} nonstudent`;
  }
}
