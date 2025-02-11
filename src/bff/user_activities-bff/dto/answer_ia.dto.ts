import { IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MetricDto {
  @IsString()
  description: string;

  @IsNumber()
  metricPercentage: number;

  @IsNumber()
  grade: number;

  @IsNumber()
  idMetric: number;
}

class PerformanceMetricDto {
  @IsString()
  group: string;

  @IsNumber()
  idGroup: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MetricDto)
  metrics: MetricDto[];
}

export class ResponseAnswerDto {
  @IsNumber()
  id_response: number;

  @IsString()
  analyzerFeedback: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PerformanceMetricDto)
  performanceEvaluation: PerformanceMetricDto[];

  @IsString()
  @IsOptional()
  student_answer: string;
}
