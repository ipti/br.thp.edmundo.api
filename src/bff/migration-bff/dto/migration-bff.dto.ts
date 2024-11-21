import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';




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
