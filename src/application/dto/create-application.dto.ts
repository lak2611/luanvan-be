import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  fullname: string;

  @IsDate()
  birthday: Date;

  @IsString()
  gender: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  family: string;

  @IsString()
  healthStatus: string;

  @IsString()
  hometown: string;

  @IsString()
  university: string;

  @IsString()
  major: string;

  @IsString()
  careerGoal: string;

  @IsString()
  scholarEssay: string;

  @IsNumber()
  year: number;
}
