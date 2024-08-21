import { ApiProperty } from '@nestjs/swagger';
import { Difficulties, Type_Activities } from '@prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

export class CreateActivitiesDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  name: string;


  @IsOptional()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  type_activities: Type_Activities;

  @IsNotEmpty()
  @ApiProperty()
  points_activities: number;

  @IsNotEmpty()
  @ApiProperty()
  difficult: Difficulties;

  @IsNotEmpty()
  @ApiProperty()
  time_activities: number;
}
