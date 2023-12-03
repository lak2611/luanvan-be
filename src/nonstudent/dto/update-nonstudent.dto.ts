import { PartialType } from '@nestjs/mapped-types';
import { CreateNonstudentDto } from './create-nonstudent.dto';

export class UpdateNonstudentDto extends PartialType(CreateNonstudentDto) {}
