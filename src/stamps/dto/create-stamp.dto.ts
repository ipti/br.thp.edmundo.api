import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateStrampsDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    @ApiProperty({ description: 'Name of the tag', type: String })
    name: string;
  
}
