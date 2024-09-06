import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class ClassesResponse {
  @ApiProperty({ description: "Classes's id" })
  id: number;

  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  module_id: number;

  @IsOptional()
  @ApiProperty()
  necessary_material: string;

  @IsOptional()
  @ApiProperty()
  objective: string;
  
  @IsOptional()
  @ApiProperty()
  duration: number;
}
