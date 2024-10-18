import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChartBffService } from './service/chart-bff.service';
import { ChartBffController } from './chart-bff.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ChartBffController],
  providers: [ChartBffService],
  exports: [ChartBffService],
})
export class ChartBffModule { }
 