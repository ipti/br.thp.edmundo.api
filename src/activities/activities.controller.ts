import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActivitiesResponse } from './doc/activities.response';
import { CreateActivitiesDto } from './dto/create-activities.dto';
import { UpdateActivitiesDto } from './dto/update-activities.dto';
import { ActivitiesService } from './shared/activities.service';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('activities')
@ApiTags('Activities')
export class ActivitiesController {
  constructor(private ActivitiesService: ActivitiesService) { }

  @Post()
  @ApiCreatedResponse({ type: ActivitiesResponse })
  async create(@Req() req: Request, @Body() classes: CreateActivitiesDto) {
    return this.ActivitiesService.create(req.user, classes);
  }

  @Get()
  async getAll() {
    return this.ActivitiesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ActivitiesResponse })
  async getById(@Param('id') id: string) {
    return this.ActivitiesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() classes: UpdateActivitiesDto,
  ) {
    return this.ActivitiesService.update(req.user, id, classes);
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.ActivitiesService.remove(req.user, id);
  }
}
