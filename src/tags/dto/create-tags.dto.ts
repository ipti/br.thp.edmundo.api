import { ApiProperty } from '@nestjs/swagger';
import { Type_Tags } from '@prisma/client';
import {
  IsEnum,
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

  @IsNotEmpty()
  @IsEnum(Type_Tags)
  @ApiProperty({ required: false, default: Type_Tags.USERS })
  type?: Type_Tags;

}
