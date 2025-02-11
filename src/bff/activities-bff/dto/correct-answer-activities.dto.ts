import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class correctAnswerDto {
  @IsNotEmpty()
  @IsInt()
  idMetric: number;

  @IsOptional()
  @IsString()
  correctAnswer: string;
}

export class CorrectAnswerMetricsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => correctAnswerDto)
  metrics: correctAnswerDto[];
}
