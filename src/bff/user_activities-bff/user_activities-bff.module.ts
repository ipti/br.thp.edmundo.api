import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AzureProviderService } from 'src/utils/middleware/azure.provider';
import { UserActivitiesBffController } from './user_activities-bff.controller';
import { UserActivitiesBffService } from './service/user_activities-bff.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserActivitiesBffController],
  providers: [UserActivitiesBffService, AzureProviderService],
  exports: [UserActivitiesBffService],
})
export class UserActivitiesBffModule { }
