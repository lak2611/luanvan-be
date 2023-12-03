import { Inject, Injectable } from '@nestjs/common';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import { Round } from 'src/entities/Round';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { makeRes } from 'src/utils/makeRes';
import { DocType } from 'src/entities/DocType';
import { Roles } from 'src/auth/role.decorator';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class RoundService {
  constructor(
    @InjectRepository(Round)
    private roundRepository: Repository<Round>,
    @InjectRepository(DocType)
    private docTypeRepository: Repository<DocType>,
    @Inject(MailService) private readonly mailService: MailService,
  ) {}

  async create(createRoundDto: CreateRoundDto) {
    await this.roundRepository.save(createRoundDto);
    return makeRes('success', 'Round created successfully');
  }

  async findAll() {
    const rounds = await this.roundRepository.find({
      relations: ['doctypes'],
    });
    return makeRes(rounds, 'success');
  }

  async findOne(id: number) {
    const round = await this.roundRepository.findOne({
      where: { year: id },
      relations: ['doctypes', 'applications'],
    });
    return makeRes(round, 'success');
  }

  async update(id: number, updateRoundDto: UpdateRoundDto) {
    try {
      //check round exist
      const round = await this.roundRepository.findOne({
        where: { year: id },
      });
      if (!round) {
        return makeRes(null, 'Round not found');
      }
      // get doctypes
      let doctypes = [];
      if (updateRoundDto?.docTypeList?.length) {
        doctypes = await this.docTypeRepository.findBy(
          updateRoundDto.docTypeList.map((docType) => {
            return { doctypeId: docType };
          }),
        );
      }
      round.doctypes = doctypes;
      delete updateRoundDto.docTypeList;
      //for each key in updateRoundDto, update the round
      for (const key in updateRoundDto) {
        round[key] = updateRoundDto[key];
      }
      await this.roundRepository.save(round);
      return makeRes('success', 'Round updated successfully');
    } catch (error) {
      return makeRes(null, error.message);
    }
  }

  @Roles(['admin'])
  async publicResult(year: number) {
    try {
      const round = await this.roundRepository.findOne({
        where: { year },
        relations: ['applications'],
      });
      if (!round) {
        return makeRes(null, 'Round not found');
      }
      round.publicResult = true;
      await this.roundRepository.save(round);
      // send email to all applicants
      round.applications.forEach((application) => {
        if (application.status === 'approved') {
          this.mailService.sendPassedNoti(application.email, year);
        }
        if (application.status === 'rejected') {
          this.mailService.sendFailedNoti(application.email, year);
        }
      });
      //return
      return makeRes('success', 'Round updated successfully');
    } catch (error) {
      return makeRes(null, error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} round`;
  }
}
