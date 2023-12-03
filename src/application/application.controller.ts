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
  ParseIntPipe,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { UpdateApplicationDto } from './dto/update-application.dto';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { Roles } from 'src/auth/role.decorator';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(@Body() formData: any, @UploadedFiles() files: any) {
    return this.applicationService.create(formData, files);
  }

  @Get()
  findAll() {
    return this.applicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(+id);
  }

  @Get('year/:year')
  findByYear(@Param('year', new ParseIntPipe()) year: number) {
    return this.applicationService.findByYear(year);
  }

  @Roles(['admin'])
  @Post('update-status/:id')
  updateStatus(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: { status: string },
  ) {
    return this.applicationService.updateStatus(id, body.status);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateApplicationDto: UpdateApplicationDto,
  // ) {
  //   return this.applicationService.update(+id, updateApplicationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.applicationService.remove(+id);
  // }
}
