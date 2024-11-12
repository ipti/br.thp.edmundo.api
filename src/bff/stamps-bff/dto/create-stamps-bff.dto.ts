import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';

class StampsDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  idUser: number;
}

export class CreateUserStampsDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  idStamp: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  idUser: number;
}

export class CreateStampsDto {
  @ValidateNested({ each: true })
  @Type(() => StampsDto)
  @ApiProperty({ type: [StampsDto], required: false })
  items: StampsDto[];

  @IsNotEmpty()
  @ApiProperty()
  idStamps: number;
}
