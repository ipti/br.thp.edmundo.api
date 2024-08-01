import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ReapplicationController } from './reapplication.controller';
import { ReapplicationService } from './shared/reapplication.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReapplicationController],
  providers: [ReapplicationService],
  exports: [ReapplicationService],
})
export class ReapplicationModule {}
