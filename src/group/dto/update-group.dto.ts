import { PartialType } from '@nestjs/swagger';
import { CreateGroupDTO } from './create-group.dto';

export class UpdateTagsDto extends PartialType(CreateGroupDTO) {}
