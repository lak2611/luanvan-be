import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocTypeService } from './doc-type.service';
import { CreateDocTypeDto } from './dto/create-doc-type.dto';
import { UpdateDocTypeDto } from './dto/update-doc-type.dto';
import { Roles } from 'src/auth/role.decorator';

@Controller('doc-type')
export class DocTypeController {
  constructor(private readonly docTypeService: DocTypeService) {}

  @Roles(['admin'])
  @Post()
  create(@Body() createDocTypeDto: CreateDocTypeDto) {
    return this.docTypeService.create(createDocTypeDto);
  }

  @Roles(['admin'])
  @Get()
  findAll() {
    return this.docTypeService.findAll();
  }

  @Roles(['admin'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docTypeService.findOne(+id);
  }

  @Roles(['admin'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocTypeDto: UpdateDocTypeDto) {
    return this.docTypeService.update(+id, updateDocTypeDto);
  }

  @Roles(['admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docTypeService.remove(+id);
  }
}
