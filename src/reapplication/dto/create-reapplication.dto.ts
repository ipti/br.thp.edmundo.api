import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

export class CreateReapplicationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: 1 })
  active?: boolean;
}
