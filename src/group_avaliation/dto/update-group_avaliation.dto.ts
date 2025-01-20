import { PartialType } from '@nestjs/swagger';
import { CreateGroupDTO } from './create-group_avaliation.dto';

export class UpdateTagsDto extends PartialType(CreateGroupDTO) {}
