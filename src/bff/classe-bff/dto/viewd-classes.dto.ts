import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber
} from 'class-validator';

export class UpdateViewdClassesDto {

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: false, default: 1 })
  idClasse?: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: false, default: 1 })
  idUser?: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: false, default: 1 })
  idClassroom?: number;
}
