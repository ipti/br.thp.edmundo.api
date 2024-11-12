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
import { StampsResponse } from './doc/stamps-bff.response';
import { StampsBffService } from './shared/stamps-bff.service';
import {
  CreateStampsDto,
  CreateUserStampsDto,
} from './dto/create-stamps-bff.dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('stamp-bff')
@ApiTags('StampBff')
export class StampsBffController {
  constructor(private StampsBffService: StampsBffService) {}

  @Post('user-one')
  @ApiCreatedResponse({ type: StampsResponse })
  async createTagUser(@Body() userstamp: CreateUserStampsDto) {
    return this.StampsBffService.createStampUser(userstamp);
  }

  @Post('users')
  @ApiCreatedResponse({ type: StampsResponse })
  async createTagActivities(@Body() stampUsers: CreateStampsDto) {
    return this.StampsBffService.createUsersStamp(stampUsers);
  }

}
