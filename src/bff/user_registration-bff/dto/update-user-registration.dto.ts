import { ApiProperty } from '@nestjs/swagger';
import { Kinship } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsNumber,
  IsString,
  Length,
  MaxLength
} from 'class-validator';

export class UpdateUserRegistrationDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @Transform(({ value }) => {
    const date = new Date(value);
    return date;
  })
  @IsOptional()
  @IsDate()
  @ApiProperty({ type: Date, required: false })
  birthday: Date;

  @IsOptional()
  @Length(5, 64)
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsNumber()
  sex: number;

  @IsOptional()
  @IsNumber()
  color_race: number;

  @IsOptional()
  @IsBoolean()
  deficiency: boolean;

  @IsOptional()
  @IsString()
  deficiency_description?: string;

  @IsOptional()
  @IsString()
  responsable_name?: string;

  @IsOptional()
  @IsString()
  responsable_cpf?: string;

  @IsOptional()
  @IsString()
  responsable_telephone?: string;

  @IsOptional()
  @IsString()
  kinship?: Kinship;

  @IsOptional()
  @IsNumber()
  zone: number;
}
