import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './shared/activities.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true, // Importante para tornar o ConfigService global
    }),
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule { }
