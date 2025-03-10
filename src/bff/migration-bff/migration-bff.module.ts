import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MigrationBffController } from './migration-bff.controller';
import { MigrationBffService } from './shared/migration-bff.service';
import { UsersService } from 'src/users/shared/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [MigrationBffController],
  providers: [MigrationBffService, UsersService],
  exports: [MigrationBffService],
})
export class MigrationBffModule { }
