import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ModuleBffService } from './service/module-bff.service';

@ApiTags('Module-bff')
@Controller('module-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ModuleBffController {
  constructor(private ModuleBffService: ModuleBffService) { }

  @Get('')
  async getById(@Query('id') id: number) {
    return this.ModuleBffService.findModule(id);
  }


}
