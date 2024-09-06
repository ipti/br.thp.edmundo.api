import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClasseBffService } from './service/classe-bff.service';
import { ClasseBffController } from './classes-bff.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ClasseBffController],
  providers: [ClasseBffService],
  exports: [ClasseBffService],
})
export class ClasseBffModule { }
 