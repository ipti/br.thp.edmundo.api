import { ApiProperty } from '@nestjs/swagger';

export class GroupResponse {
  @ApiProperty({ description: "Reapplication's id" })
  id: number;

  @ApiProperty()
  content: string;


  activities_fk: number
}
