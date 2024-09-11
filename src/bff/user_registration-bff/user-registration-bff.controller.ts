import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserResponse } from './doc/users-registration.response';
import { UpdateUserRegistrationDto } from './dto/update-user-registration.dto';
import { UserRegistrationBffService } from './service/user-registration-bff.service';
import { CreateUserRegistrationDto } from './dto/create-users-registration.dto';


@ApiTags('User-Registration-bff')
@Controller('user-registration-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UserRegistrationBffController {
  constructor(private UserService: UserRegistrationBffService) { }

  @Post()
  @ApiCreatedResponse({ type: UserResponse })
  async create(@Body() user: CreateUserRegistrationDto) {
    return this.UserService.create(user);
  }


  @Put()
  @ApiCreatedResponse({ type: UserResponse })
  async updateUser(
    @Body() user: UpdateUserRegistrationDto,
    @Query('idUser') idUser: string,
  ) {
    return this.UserService.updateUser(user, idUser);
  }



  @Get(':id')
  @ApiCreatedResponse({ type: UserResponse })
  async getById(@Param('id') id: string) {
    return this.UserService.findOne(+id);
  }
}
