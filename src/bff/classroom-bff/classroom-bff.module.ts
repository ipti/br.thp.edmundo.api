import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClassroomBffService } from './service/classroom-bff.service';
import { ClassroomBffController } from './classroom-bff.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ClassroomBffController],
  providers: [ClassroomBffService],
  exports: [ClassroomBffService],
})
export class ClassroomBffModule { }
