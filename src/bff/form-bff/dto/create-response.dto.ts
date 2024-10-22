import { IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OptionDto {
  @IsInt()
  answer_question_fk: number;

  @IsInt()
  options_fk: number;
}

class QuestionDto {
  @IsInt()
  answer_form_fk: number;

  @IsInt()
  question_fk: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];
}

export class CreateResponseDto {
  @IsInt()
  form_fk: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  question: QuestionDto[];
}
