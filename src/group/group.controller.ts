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
import { CreateGroupDTO } from './dto/create-group.dto';
import { UpdateTagsDto } from './dto/update-group.dto';
import { GroupService } from './shared/group.service';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('group')
@ApiTags('Group')
export class GroupController {
  constructor(private GroupService: GroupService) { }

  @Post()
  @ApiCreatedResponse({ type: GroupResponse })
  async create(@Req() req: Request, @Body() body: CreateGroupDTO) {
    return this.GroupService.create(req.user, body);
  }

  @Get()
  async getAll() {
    return this.GroupService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: GroupResponse })
  async getById(@Param('id') id: string) {
    return this.GroupService.findOne(id);
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: UpdateTagsDto,
  ) {
    return this.GroupService.update(req.user, id, body);
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.GroupService.remove(req.user, id);
  }
}
