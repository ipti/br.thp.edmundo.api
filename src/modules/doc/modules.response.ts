import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class ModulesResponse {
  @ApiProperty({ description: "Modules's id" })
  id: number;

  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  name: string;
}
