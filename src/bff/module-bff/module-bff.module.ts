import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ModuleBffService } from './service/module-bff.service';
import { ModuleBffController } from './module-bff.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ModuleBffController],
  providers: [ModuleBffService],
  exports: [ModuleBffService],
})
export class ModuleBffModule { }
