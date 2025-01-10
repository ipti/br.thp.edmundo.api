import { ApiProperty } from '@nestjs/swagger';

export class TypeGroupResponse {
  @ApiProperty({ description: "TypeGroup's id" })
  id: number;


  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;

}
