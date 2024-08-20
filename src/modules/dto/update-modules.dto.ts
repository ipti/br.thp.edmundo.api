import { PartialType } from '@nestjs/swagger';
import { CreateModulesDto } from './create-modules.dto';

export class UpdateModulesDto extends PartialType(CreateModulesDto) {}
