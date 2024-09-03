import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateClassroomClassesResponse {
  @ApiProperty({ description: 'Classroom Classes  id' })
  id: string;

  

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  active?: boolean;
}
