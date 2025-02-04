import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateQuestionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Option content' })
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'id question' })
  id: number;

}
