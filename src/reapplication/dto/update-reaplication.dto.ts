import { PartialType } from '@nestjs/swagger';
import { CreateReapplicationDto } from './create-reapplication.dto';

export class UpdateReapplicationDto extends PartialType(
  CreateReapplicationDto,
) {}
