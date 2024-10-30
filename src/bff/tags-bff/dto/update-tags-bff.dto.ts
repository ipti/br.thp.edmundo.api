import { PartialType } from '@nestjs/swagger';
import { CreateTagsDto } from './create-tags-bff.dto';

export class UpdateTagsDto extends PartialType(
  CreateTagsDto,
) { }
