import { ApiProperty } from '@nestjs/swagger';

export class ClassroomResponse {
  @ApiProperty({ description: "Classroom's id" })
  id: string;

  @ApiProperty({ description: "Classroom's project_fk" })
  project_fk: number;

  @ApiProperty({ description: "Classroom's name" })
  name: string;

  @ApiProperty({ description: "Classroom's year" })
  year: number;

  @ApiProperty({ required: false, default: true })
  active?: boolean;
}
