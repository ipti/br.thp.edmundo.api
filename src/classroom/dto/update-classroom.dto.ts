import {
    IsBoolean,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength,
} from 'class-validator';

export class UpdateClassroomDto {

    @IsOptional()
    @IsString()
    @MaxLength(150)
    name: string;

   

    @IsOptional()
    @IsBoolean()
    active?: boolean;

    @IsOptional()
    @IsBoolean()
    isOpen?: boolean;
}
