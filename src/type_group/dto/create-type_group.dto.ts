import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeGroupDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Name of the stamp', type: String })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Valeu of the stamp', type: String })
    value: string;

  

}
