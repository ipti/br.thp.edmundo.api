import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserActivitiesBffService } from './service/user_activities-bff.service';
import { UserActivitiesDto } from './dto/user_activities.dto';
import { UserActivitiesRatingDto } from './dto/user_activities_rating.dto';

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

  @Post('user-avaliation')
  async create(@Query('id') id: number, @Body() body: UserActivitiesDto) {
    return this.UserActivitiesBffService.avaliationActivities(id, body);
  }

  @Put('user-avaliation')
  async update(@Query('id') id: number, @Body() body: UserActivitiesDto) {
    return this.UserActivitiesBffService.updateavaliationActivities(id, body);
  }

  @Post('user-activities-rating')
  async createRating(
    @Query('id') id: number,
    @Body() body: UserActivitiesRatingDto,
  ) {
    return this.UserActivitiesBffService.ratingUser(id, body);
  }


}
