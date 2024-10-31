import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';

class TagDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  idTag: number;
}
export class CreateUserTagsDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  @ApiProperty({ type: [TagDto] })
  items: TagDto[];
}

export class CreateActivitiesTagsDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  @ApiProperty({ type: [TagDto] })
  items: TagDto[];

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  idActivitie: number;
}
