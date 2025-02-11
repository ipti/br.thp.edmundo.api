import {
  IsArray,
  IsNotEmpty,
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

  @IsNumber()
  idMetric: number;

  @IsString()
  correctAnswer: string;
}

export class StudentAnswerDto {
  @IsString()
  answer: string;

  @IsNumber()
  idGroup: number;

  @IsString()
  name: string;
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

export class CreateAnswerIADto {
  @IsNotEmpty()
  @IsNumber()
  id_user_activities: number;

  @IsNotEmpty()
  @IsString()
  tasksDescription: string;

  @IsNotEmpty()
  @IsString()
  correctAnswer: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PerformanceMetricDto)
  performanceMetrics: PerformanceMetricDto[];

  @IsArray()
  @IsNotEmpty()
  student_answer: StudentAnswerDto[];
}
