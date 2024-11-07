import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StampsController } from './stamp.controller';
import { StampsService } from './shared/stamp.service';
import { AzureProviderService } from 'src/utils/middleware/azure.provider';

@Module({
  imports: [PrismaModule],
  controllers: [StampsController],
  providers: [StampsService, AzureProviderService],
  exports: [StampsService],
})
export class StampsModule {}
