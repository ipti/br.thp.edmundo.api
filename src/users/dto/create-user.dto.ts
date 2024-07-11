import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Length(5, 32)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MaxLength(45)
  @IsString()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: 1 })
  active?: boolean;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({ required: false, default: Role.STUDENT })
  role?: Role;
}
