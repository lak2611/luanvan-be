import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { NonstudentService } from './nonstudent.service';
import { CreateNonstudentDto } from './dto/create-nonstudent.dto';
import { UpdateNonstudentDto } from './dto/update-nonstudent.dto';
import { Roles } from 'src/auth/role.decorator';

@Controller('nonstudent')
export class NonstudentController {
  constructor(private readonly nonstudentService: NonstudentService) {}

  @Post()
  create(@Body() createNonstudentDto: CreateNonstudentDto) {
    return this.nonstudentService.create(createNonstudentDto);
  }

  @Get()
  findAll() {
    return this.nonstudentService.findAll();
  }

  @Get('user')
  @Roles(['nonstudent'])
  findCurrentUser(
    @Body() createNonstudentDto: CreateNonstudentDto,
    @Request() request: any,
  ) {
    const user = request.user;
    return this.nonstudentService.findByUsername(user.username);
  }

  @Patch('user')
  @Roles(['nonstudent'])
  updateCurrentUser(
    @Body() updateNonstudentDto: UpdateNonstudentDto,
    @Request() request: any,
  ) {
    const user = request.user;
    return this.nonstudentService.updateByUsername(
      user.username,
      updateNonstudentDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nonstudentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNonstudentDto: UpdateNonstudentDto,
  ) {
    return this.nonstudentService.update(+id, updateNonstudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nonstudentService.remove(+id);
  }
}
