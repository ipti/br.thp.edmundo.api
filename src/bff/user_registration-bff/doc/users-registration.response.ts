import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class UserResponse {
  @ApiProperty({ description: "User's id" })
  id: string;

  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsOptional()
  @ApiProperty()
  project: Array<number>;

  @IsOptional()
  @ApiProperty()
  role: Role;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  active?: boolean;
}
