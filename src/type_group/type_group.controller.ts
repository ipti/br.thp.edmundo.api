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
import { TypeGroupResponse } from './doc/type_group.response';
import { CreateTypeGroupDto } from './dto/create-type_group.dto';
import { UpdateTypeGroupDto } from './dto/update-type_group.dto';
import { TypeGroupService } from './shared/type_group.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('type_group')
@ApiTags('TypeGroup')
export class TypeGroupController {
  constructor(private TypeGroupService: TypeGroupService) {}

  @Post()
  @ApiCreatedResponse({ type: TypeGroupResponse })
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() CreateTypeGroupDto: CreateTypeGroupDto) {
    return this.TypeGroupService.create(CreateTypeGroupDto);
  }

  @Get()
  async getAll() {
    return this.TypeGroupService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TypeGroupResponse })
  async getById(@Param('id') id: string) {
    return this.TypeGroupService.findOne(id);
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() project: UpdateTypeGroupDto,
  ) {
    return this.TypeGroupService.update(req.user, id, project);
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.TypeGroupService.remove(req.user, id);
  }
}
