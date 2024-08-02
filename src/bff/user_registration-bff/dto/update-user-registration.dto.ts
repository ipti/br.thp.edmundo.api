import { ApiProperty } from '@nestjs/swagger';
import { Kinship } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength
} from 'class-validator';

export class UpdateUserRegistrationDto {
  @IsNotEmpty()
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

  @IsNotEmpty()
  @Length(5, 64)
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsNotEmpty()
  @IsNumber()
  sex: number;

  @IsNotEmpty()
  @IsNumber()
  color_race: number;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsNumber()
  zone: number;
}
