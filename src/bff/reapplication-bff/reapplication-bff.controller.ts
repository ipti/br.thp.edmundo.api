import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReapplicationnBffService } from './service/reapplication-bff.service';
import { Request } from 'express';

@ApiTags('Reapplication-bff')
@Controller('reapplication-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ReapplicationBffController {
  constructor(private ReapplicationnBffService: ReapplicationnBffService) { }

  @Get('')
  async getById(@Req() req: Request) {
    return this.ReapplicationnBffService.findReapplicationUser(req.user.id);
  }


}
