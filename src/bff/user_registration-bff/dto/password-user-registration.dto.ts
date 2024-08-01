import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    MaxLength
} from 'class-validator';

export class ChangePasswordUserDto {

  @IsNotEmpty()
  @MaxLength(60)
  @IsString()
  @ApiProperty()
  password: string;

}
