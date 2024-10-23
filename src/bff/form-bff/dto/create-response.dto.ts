import { IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OptionDto {

  @IsInt()
  options_fk: number;
}

class QuestionDto {

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

  @IsInt()
  user_activities_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  question: QuestionDto[];
}
