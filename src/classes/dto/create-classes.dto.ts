import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

export class CreateClassesDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  necessary_material: string;

  @IsOptional()
  @ApiProperty()
  objective: string;
  
  @IsOptional()
  @ApiProperty()
  duration: number;
}
