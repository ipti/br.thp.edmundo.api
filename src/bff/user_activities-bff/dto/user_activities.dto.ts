import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UserActivitiesDto {
  @IsOptional()
  @ApiProperty({ required: false, default: true })
  complete_the_activity_correctly?: number;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  content_organization?: number;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  completion_within_the_indicated_deadline?: number;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  creativity_in_the_response?: number;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  collaboration?: number;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  understanding_the_content?: number;

  @IsNotEmpty()
  @ApiProperty({ required: false, default: true })
  total?: number;
}
