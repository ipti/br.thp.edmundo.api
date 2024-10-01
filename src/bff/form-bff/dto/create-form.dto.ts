import { ApiProperty } from '@nestjs/swagger';
import { Type_Question } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class OptionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Option content' })
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Option value' })
  value: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ description: 'Option response' })
  isResponse: boolean;
}


export class CreateFormResponse {
  @ApiProperty({ description: 'Classroom Module id' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false, default: true })
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: false, default: true })
  form_fk: number;

  @IsNotEmpty()
  @ApiProperty({ required: false, default: true })
  type: Type_Question;

  @IsNotEmpty()
  @ApiProperty({
    type: [OptionDto],
    description: 'Array of options for the question',
  })
  options: OptionDto[];

}

export class CreateFormDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormResponse)
  @ApiProperty({
    type: [CreateFormResponse],
    description: 'Array of form responses',
  })
  questions: CreateFormResponse[];
}
