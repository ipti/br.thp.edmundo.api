import { PartialType } from '@nestjs/swagger';
import { CreateMetricGroupDTO } from './create-metric_group_avaliation.dto';

export class UpdateMetricGroupDto extends PartialType(CreateMetricGroupDTO) {}
