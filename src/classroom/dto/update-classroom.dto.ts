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
    @IsNumber()
    @IsPositive()
    year: number;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
