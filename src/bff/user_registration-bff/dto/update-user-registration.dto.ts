import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
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

export class UpdateUserDto {
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
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  sex: number;

  @IsNotEmpty()
  @IsNumber()
  color_race: number;

  @Transform(({ value }) => {
    const date = new Date(value);
    return date;
  })

  @IsNotEmpty()
  @Length(5, 32)
  @ApiProperty()
  username: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: 1 })
  active?: boolean;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  project?: Array<number>;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({ required: false, default: Role.STUDENT })
  role?: Role;
}
