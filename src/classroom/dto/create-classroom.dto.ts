import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateClassroomDto {

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  reapplication: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
