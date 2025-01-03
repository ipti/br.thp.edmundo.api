import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';



export class CreateMetricGroupDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  metric_percentange: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  idGroup: number;
}
