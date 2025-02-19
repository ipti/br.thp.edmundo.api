import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserActivitiesBffService } from './service/user_activities-bff.service';
import { UserActivitiesDto } from './dto/user_activities.dto';
import { UserActivitiesRatingDto } from './dto/user_activities_rating.dto';
import { CreateAnswerIADto } from './dto/answer_user_activities.dto';
import { ResponseAnswerDto } from './dto/answer_ia.dto';

@ApiTags('User-Activities-bff')
@Controller('user-activities-bff')
export class UserActivitiesBffController {
  constructor(private UserActivitiesBffService: UserActivitiesBffService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getById(
    @Query('id') id: number,
    @Query('idClassroom') idClassroom: number,
  ) {
    return this.UserActivitiesBffService.findUserActivities(id, idClassroom);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('user-avaliation')
  async create(@Query('id') id: number, @Body() body: UserActivitiesDto) {
    return this.UserActivitiesBffService.avaliationActivities(id, body);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put('user-avaliation')
  async update(@Query('id') id: number, @Body() body: UserActivitiesDto) {
    return this.UserActivitiesBffService.updateavaliationActivities(id, body);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put('user-avaliation-classroom')
  async updateGrade(
    @Query('idClassroomActivities') idClassroomActivities: number,
  ) {
    return this.UserActivitiesBffService.avaliationActivitiesAll(
      idClassroomActivities,
    );
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('user-activities-rating')
  async createRating(
    @Query('id') id: number,
    @Body() body: UserActivitiesRatingDto,
  ) {
    return this.UserActivitiesBffService.ratingUser(id, body);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('answer-user-activities-send')
  async sendAnswerIA(@Body() body: CreateAnswerIADto) {
    return this.UserActivitiesBffService.sendAnswerIA(body);
  }

  @Post('answer-user-activities-response')
  async answerIA(
    @Body() body: ResponseAnswerDto,
    @Query('token') token: string,
  ) {
    return this.UserActivitiesBffService.answerIA(body, token);
  }
}
