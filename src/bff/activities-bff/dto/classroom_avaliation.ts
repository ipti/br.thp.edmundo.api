import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ClassroomAvaliationDto {
  @IsOptional()
  @ApiProperty({ required: false, default: true })
  complete_the_activity_correctly?: boolean;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  content_organization?: boolean;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  completion_within_the_indicated_deadline?: boolean;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  creativity_in_the_response?: boolean;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  collaboration?: boolean;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  understanding_the_content?: boolean;

}
