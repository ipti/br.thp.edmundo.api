import { ApiProperty } from '@nestjs/swagger';
import { Type_Stamps } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateStrampsDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Name of the stamp', type: String })
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'Description of the stamp', type: String })
    description: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'Type of the stamp', type: String })
    type: Type_Stamps;

}
