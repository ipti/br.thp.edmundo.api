import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength
} from 'class-validator';

export class CreateTagsDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  content: string;

}
