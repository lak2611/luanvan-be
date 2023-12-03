import { IsNumber, IsDateString, IsString, IsArray } from 'class-validator';

export class CreateRoundDto {
  @IsNumber()
  year: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsString()
  description: string;

  @IsArray()
  docTypeList: number[];
}
