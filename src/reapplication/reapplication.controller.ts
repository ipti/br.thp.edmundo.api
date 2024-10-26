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
import { ReapplicationResponse } from './doc/reapplication.response';
import { CreateReapplicationDto } from './dto/create-reapplication.dto';
import { UpdateReapplicationDto } from './dto/update-reaplication.dto';
import { ReapplicationService } from './shared/reapplication.service';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('reapplication')
@ApiTags('Reapplication')
export class ReapplicationController {
  constructor(private ReapplicationService: ReapplicationService) { }

  @Post()
  @ApiCreatedResponse({ type: ReapplicationResponse })
  async create(@Req() req: Request, @Body() project: CreateReapplicationDto) {
    return this.ReapplicationService.create(req.user, project);
  }

  @Get()
  async getAll() {
    return this.ReapplicationService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReapplicationResponse })
  async getById(@Param('id') id: string) {
    return this.ReapplicationService.findOne(id);
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() project: UpdateReapplicationDto,
  ) {
    return this.ReapplicationService.update(req.user, id, project);
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.ReapplicationService.remove(req.user, id);
  }
}
