import { PartialType } from '@nestjs/swagger';
import { CreateTypeGroupDto } from './create-type_group.dto';

export class UpdateTypeGroupDto extends PartialType(CreateTypeGroupDto) {}
