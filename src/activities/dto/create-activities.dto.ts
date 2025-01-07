import { ApiProperty } from '@nestjs/swagger';
import { Difficulties, Type_Activities } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class CreateActivitiesDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  type_activities: Type_Activities;

  @IsOptional()
  @ApiProperty()
  expected_return: string;

  @IsNotEmpty()
  @ApiProperty()
  points_activities: number;

  @IsNotEmpty()
  @ApiProperty()
  difficult: Difficulties;

  @IsNotEmpty()
  @ApiProperty()
  time_activities: number;

  @IsNotEmpty()
  @ApiProperty()
  id_classes: number;

  @IsArray({ message: 'O campo ids deve ser um array.' })
  @ArrayNotEmpty({
    message: 'O array de ids deve conter pelo menos um elemento.',
  })
  @ValidateNested({
    each: true,
    message: 'Cada elemento do array deve ser um objeto válido.',
  })
  @Type(() => IdDto) // Transforma os itens em instâncias de `IdDto`
  groups: IdDto[];
}

export class IdDto {
  @IsInt({ message: 'O ID deve ser um número inteiro.' })
  @IsPositive({ message: 'O ID deve ser um número positivo.' })
  idGroup: number;
}
