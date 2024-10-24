import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserActivitiesRatingDto {
  
  @IsNotEmpty()
  @ApiProperty({ required: false, default: true })
  rating?: number;
}
