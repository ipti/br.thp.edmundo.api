import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateStrampsDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    @ApiProperty({ description: 'Name of the tag', type: String })
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(150)
    @ApiProperty({ description: 'Description of the tag', type: String })
    description: string;
  
}
