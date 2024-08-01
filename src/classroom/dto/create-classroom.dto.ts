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
  user_owner: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  reapplication: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  year: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
