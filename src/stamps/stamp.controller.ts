import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TagResponse } from './doc/stamp.response';
import { CreateStrampsDto } from './dto/create-stamp.dto';
import { UpdateStampDto } from './dto/update-stamp.dto';
import { StampsService } from './shared/stamp.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('stamps')
@ApiTags('Stamps')
export class StampsController {
  constructor(private StampsService: StampsService) {}

  @Post()
  @ApiCreatedResponse({ type: TagResponse })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() CreateStrampsDto: CreateStrampsDto,
    @UploadedFile() file: any,
  ) {
    return this.StampsService.create(CreateStrampsDto, file);
  }

  @Get()
  async getAll() {
    return this.StampsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TagResponse })
  async getById(@Param('id') id: string) {
    return this.StampsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() project: UpdateStampDto,
  ) {
    return this.StampsService.update(req.user, id, project);
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.StampsService.remove(req.user, id);
  }
}
