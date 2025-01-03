import { PartialType } from '@nestjs/swagger';
import { CreateMetricGroupDTO } from './create-group.dto';

export class UpdateMetricGroupDto extends PartialType(CreateMetricGroupDTO) {}
