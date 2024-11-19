import { ApiProperty } from '@nestjs/swagger';

export class TagResponse {
  @ApiProperty({ description: "Reapplication's id" })
  id: number;


  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;


  @ApiProperty()
  img_url: string;

}
