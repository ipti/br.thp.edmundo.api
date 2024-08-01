import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class ReapplicationResponse {
  @ApiProperty({ description: "Reapplication's id" })
  id: number;

  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  active?: boolean;
}
