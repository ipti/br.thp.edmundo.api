import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TagResponse } from './doc/tags-bff.response';
import { TagsBffService } from './shared/tags-bff.service';
import {
  CreateActivitiesTagsDto,
  CreateUserTagsDto,
} from './dto/create-tags-bff.dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('tags-bff')
@ApiTags('TagsBff')
export class TagBffController {
  constructor(private TagsBffService: TagsBffService) { }

  @Post('users')
  @ApiCreatedResponse({ type: TagResponse })
  async createTagUser(@Req() req: Request, @Body() usertag: CreateUserTagsDto) {
    return this.TagsBffService.createTagUser(usertag, req.user);
  }

  @Post('activities')
  @ApiCreatedResponse({ type: TagResponse })
  async createTagActivities(
    @Body() activitiestag: CreateActivitiesTagsDto,
  ) {
    return this.TagsBffService.createTagActivities(activitiestag);
  }

  @Get('users-all')
  async findAllUser() {
    return this.TagsBffService.findAllUser();
  }

  @Get('activities-all')
  async findAllActivities() {
    return this.TagsBffService.findAllActivities();
  }

  @Delete('activities/:id')
  async removeTagActivities(@Param('id') id: string) {
    return this.TagsBffService.removeTagActivities(id);
  }

  @Delete('users/:id')
  async delete(@Param('id') id: string) {
    return this.TagsBffService.removeTagUser(id);
  }
}
