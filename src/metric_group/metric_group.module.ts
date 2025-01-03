import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MetricGroupController } from './metric_group.controller';
import { MetricGroupService } from './shared/metric_group.service';

@Module({
  imports: [PrismaModule],
  controllers: [MetricGroupController],
  providers: [MetricGroupService],
  exports: [MetricGroupService],
})
export class MetricGroupModule {}
