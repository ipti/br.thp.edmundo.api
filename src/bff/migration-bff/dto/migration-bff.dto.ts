import { ApiProperty } from '@nestjs/swagger';
import { Kinship } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MigrationDto {
  @ApiProperty({ example: 1, description: 'ID do projeto' })
  @IsNotEmpty()
  @IsNumber()
  project: number;

  @ApiProperty({ example: 'Projeto - Turma', description: 'Nome da turma' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 2024, description: 'Ano da turma' })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({ example: 1, description: 'Classroom ID' })
  @IsNotEmpty()
  @IsNumber()
  idClassroom: number;
}

export class RegistrationDto {

  @IsNotEmpty()
  @IsString()
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
  description?: string;

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
}

export class MigrationMeubenToCodedDto {
  @ApiProperty({ example: 1, description: 'ID do projeto' })
  @IsArray()
  registration: RegistrationDto[];

  @ApiProperty({ example: 'Nome Turma', description: 'Nome da turma' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 2024, description: 'Ano da turma' })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({ example: 1, description: 'Classroom ID' })
  @IsNotEmpty()
  @IsNumber()
  idClassroom: number;
}
