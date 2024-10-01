import { ApiProperty } from '@nestjs/swagger';
import { Type_Question } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class OptionDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Option content' })
  content: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Option value' })
  value: number;
}

export class ResponseQuestionDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Foreign key for the option' })
  option_fk: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'Foreign key for the question' })
  question_fk: number;
}

export class CreateFormResponse {
  @ApiProperty({ description: 'Classroom Module id' })
  id: string;

  @IsNotEmpty()
  @ApiProperty({ required: false, default: true })
  content: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @ApiProperty({
    type: [ResponseQuestionDto],
    description: 'Array of response questions linking options and questions',
  })
  response_question: ResponseQuestionDto[];
}

export class CreateFormResponseDoc {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormResponse)
  @ApiProperty({
    type: [CreateFormResponse],
    description: 'Array of form responses',
  })
  responses: CreateFormResponse[];
}
