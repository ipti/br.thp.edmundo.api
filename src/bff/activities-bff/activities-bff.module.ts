import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ActivitiesBffService } from './service/activities-bff.service';
import { ActivitiesBffController } from './activities-bff.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ActivitiesBffController],
  providers: [ActivitiesBffService],
  exports: [ActivitiesBffService],
})
export class ActivitiesBffModule { }
