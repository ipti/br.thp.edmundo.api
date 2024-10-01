import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FormBffService } from './service/form-bff.service';
import { FormBffController } from './form-bff.controller';
import { AzureProviderService } from 'src/utils/middleware/azure.provider';

@Module({
  imports: [PrismaModule],
  controllers: [FormBffController],
  providers: [FormBffService, AzureProviderService],
  exports: [FormBffService],
})
export class FormBffModule { }
