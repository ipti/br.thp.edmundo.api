import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class MetricDto {
  @IsString()
  description: string;

  @IsNumber()
  metricPercentage: number;

  @IsString()
  correctAnswer: string;

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

export class SendIADto {
  @IsNumber()
  id_response: number;

  @IsString()
  tasksDescription: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PerformanceMetricDto)
  performanceMetrics: PerformanceMetricDto[];

  @IsString()
  student_answer: string;
}
