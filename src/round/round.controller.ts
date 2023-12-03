import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RoundService } from './round.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/role.decorator';

@Controller('round')
export class RoundController {
  constructor(private readonly roundService: RoundService) {}

  @Roles(['admin'])
  @Post()
  create(@Body() createRoundDto: CreateRoundDto) {
    return this.roundService.create(createRoundDto);
  }

  // @Roles(['admin', 'nonstudent'])
  @Get()
  findAll() {
    return this.roundService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roundService.findOne(id);
  }

  @Post('public-result')
  publicResult(@Body() body: { year: number }) {
    return this.roundService.publicResult(body.year);
  }

  @Roles(['admin'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoundDto: UpdateRoundDto) {
    return this.roundService.update(+id, updateRoundDto);
  }

  @Roles(['admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roundService.remove(+id);
  }
}
