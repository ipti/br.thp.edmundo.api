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
import { TagResponse } from './doc/tag.response';
import { CreateTagsDto } from './dto/create-tags.dto';
import { UpdateTagsDto } from './dto/update-tags.dto';
import { TagsService } from './shared/tags.service';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('tag')
@ApiTags('Tag')
export class TagController {
  constructor(private TagsService: TagsService) { }

  @Post()
  @ApiCreatedResponse({ type: TagResponse })
  async create(@Req() req: Request, @Body() project: CreateTagsDto) {
    return this.TagsService.create(req.user, project);
  }

  @Get()
  async getAll() {
    return this.TagsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TagResponse })
  async getById(@Param('id') id: string) {
    return this.TagsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() project: UpdateTagsDto,
  ) {
    return this.TagsService.update(req.user, id, project);
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.TagsService.remove(req.user, id);
  }
}
