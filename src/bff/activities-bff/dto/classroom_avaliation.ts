import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ClassroomAvaliationDto {
  @IsOptional()
  @ApiProperty({ required: false, default: true })
  complete_the_activity_correctly?: true;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  content_organization?: true;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  completion_within_the_indicated_deadline?: true;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  creativity_in_the_response?: true;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  collaboration?: true;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  understanding_the_content?: true;

}
