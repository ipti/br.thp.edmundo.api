import { ApiProperty } from '@nestjs/swagger';
import { Type_Stamps } from '@prisma/client';

export class TagResponse {
  @ApiProperty({ description: "Reapplication's id" })
  id: number;


  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;


  @ApiProperty()
  img_url: string;

  @ApiProperty()
  type: Type_Stamps;

}
