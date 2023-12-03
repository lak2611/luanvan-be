import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('sponsor')
export class SponsorController {
  constructor(private readonly sponsorService: SponsorService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() createSponsorDto: CreateSponsorDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.sponsorService.create(createSponsorDto, files);
  }

  @Get()
  findAll() {
    return this.sponsorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sponsorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSponsorDto: UpdateSponsorDto) {
    return this.sponsorService.update(+id, updateSponsorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sponsorService.remove(+id);
  }
}
