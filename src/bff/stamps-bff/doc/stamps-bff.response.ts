import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class StampsResponse {
  @ApiProperty({ description: "Reapplication's id" })
  id: number;

  @ApiProperty()
  content: string;


  activities_fk: number
}
