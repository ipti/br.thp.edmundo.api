import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class correctAnswerDto {
  @IsNotEmpty()
  @IsInt()
  idMetric: number;

  @IsNotEmpty()
  @IsString()
  correctAnswer: string;
}

export class CorrectAnswerMetricsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => correctAnswerDto)
  metrics: correctAnswerDto[];
}
