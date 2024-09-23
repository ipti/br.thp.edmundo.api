import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserActivitiesBffService } from './service/user_activities-bff.service';

@ApiTags('User-Activities-bff')
@Controller('user-activities-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UserActivitiesBffController {
  constructor(private UserActivitiesBffService: UserActivitiesBffService) { }

  @Get('')
  async getById(@Query('id') id: number, @Req() req: Request
  ) {
    return this.UserActivitiesBffService.findUserActivities(id, req.user);
  }

}
