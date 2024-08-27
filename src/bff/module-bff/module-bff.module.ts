import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReapplicationnBffService } from './service/module-bff.service';
import { ReapplicationBffController } from './module-bff.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ReapplicationBffController],
  providers: [ReapplicationnBffService],
  exports: [ReapplicationnBffService],
})
export class ReapplicationBffModule { }
