import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';



export class CreateGroupDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;


}
