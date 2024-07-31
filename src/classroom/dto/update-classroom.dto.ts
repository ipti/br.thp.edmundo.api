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
    @IsNumber()
    @IsPositive()
    project: number;

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
