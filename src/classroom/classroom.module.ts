import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './shared/classroom.service';

@Module({
  imports: [PrismaModule],
  controllers: [ClassroomController],
  providers: [ClassroomService],
  exports: [ClassroomService],
})
export class ClassroomModule {}
