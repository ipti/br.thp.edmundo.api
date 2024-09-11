import { ApiProperty } from '@nestjs/swagger';
import { Kinship, Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserRegistrationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @MaxLength(60)
  @IsString()
  @ApiProperty()
  password: string;

  @Transform(({ value }) => {
    const date = new Date(value);
    return date;
  })
  @IsOptional()
  @IsDate()
  @ApiProperty({ type: Date, required: false })
  birthday: Date;

  @IsNotEmpty()
  @IsString()
  email: string;

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

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({ required: false, default: Role.STUDENT })
  role?: Role;
}
