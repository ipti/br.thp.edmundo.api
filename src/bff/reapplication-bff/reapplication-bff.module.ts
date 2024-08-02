import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReapplicationnBffService } from './service/reapplication-bff.service';
import { ReapplicationBffController } from './reapplication-bff.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ReapplicationBffController],
  providers: [ReapplicationnBffService],
  exports: [ReapplicationnBffService],
})
export class ReapplicationBffModule { }
