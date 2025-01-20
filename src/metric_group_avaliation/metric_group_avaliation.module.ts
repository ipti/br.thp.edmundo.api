import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MetricGroupController } from './metric_group_avaliation.controller';
import { MetricGroupService } from './shared/metric_group_avaliation.service';

@Module({
  imports: [PrismaModule],
  controllers: [MetricGroupController],
  providers: [MetricGroupService],
  exports: [MetricGroupService],
})
export class MetricGroupModule {}
