import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ActivitiesBffService } from './service/activities-bff.service';
import { ActivitiesBffController } from './activities-bff.controller';
import { AzureProviderService } from 'src/utils/middleware/azure.provider';

@Module({
  imports: [PrismaModule],
  controllers: [ActivitiesBffController],
  providers: [ActivitiesBffService, AzureProviderService],
  exports: [ActivitiesBffService],
})
export class ActivitiesBffModule { }
