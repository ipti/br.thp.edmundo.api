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
import { GroupResponse } from './doc/group.response';
import { CreateMetricGroupDTO } from './dto/create-metric_group_avaliation.dto';
import { UpdateMetricGroupDto } from './dto/update-metric_group_avaliation.dto';
import { MetricGroupService } from './shared/metric_group_avaliation.service';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('metricgroup')
@ApiTags('MetricGroupAvaliation')
export class MetricGroupController {
  constructor(private MetricGroupService: MetricGroupService) { }

  @Post()
  @ApiCreatedResponse({ type: GroupResponse })
  async create(@Req() req: Request, @Body() body: CreateMetricGroupDTO) {
    return this.MetricGroupService.create(req.user, body);
  }

  @Get()
  async getAll() {
    return this.MetricGroupService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: GroupResponse })
  async getById(@Param('id') id: string) {
    return this.MetricGroupService.findOne(id);
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: UpdateMetricGroupDto,
  ) {
    return this.MetricGroupService.update(req.user, id, body);
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.MetricGroupService.remove(req.user, id);
  }
}
