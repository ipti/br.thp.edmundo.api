import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateQuestionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Option content' })
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'id question' })
  id: number;

  @IsNotEmpty()
  @IsArray()
  options: OptionDto[];

}




export class OptionDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsNumber()
  questionId?: number;

  @IsBoolean()
  response_question: boolean;
}
