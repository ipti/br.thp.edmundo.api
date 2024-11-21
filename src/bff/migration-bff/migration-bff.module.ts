import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MigrationBffController } from './migration-bff.controller';
import { MigrationBffService } from './shared/migration-bff.service';

@Module({
  imports: [PrismaModule],
  controllers: [MigrationBffController],
  providers: [MigrationBffService],
  exports: [MigrationBffService],
})
export class MigrationBffModule { }
