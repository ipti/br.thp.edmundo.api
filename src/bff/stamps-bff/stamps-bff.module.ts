import { Module } from '@nestjs/common';
import { StampsBffController } from './stamps-bff.controller';
import { StampsBffService } from './shared/stamps-bff.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StampsBffController],
  providers: [StampsBffService],
  exports: [StampsBffService],
})
export class StampsBffModule {}
