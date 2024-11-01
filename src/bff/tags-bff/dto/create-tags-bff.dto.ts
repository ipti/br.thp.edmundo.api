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
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  @ApiProperty({ type: [TagDto], required: false })
  items: TagDto[];
}

export class CreateActivitiesTagsDto {
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  @ApiProperty({ type: [TagDto], required: false })
  items: TagDto[];

  @IsNotEmpty()
  @ApiProperty()
  idActivitie: number;
}
