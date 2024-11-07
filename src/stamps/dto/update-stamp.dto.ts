import { PartialType } from '@nestjs/swagger';
import { CreateStrampsDto } from './create-stamp.dto';

export class UpdateStampDto extends PartialType(
  CreateStrampsDto,
) { }
