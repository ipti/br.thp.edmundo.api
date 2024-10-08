import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsOptional
} from 'class-validator';

export class UpdateClassroomClassesDto {
 
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: 1 })
  active?: boolean;

}
