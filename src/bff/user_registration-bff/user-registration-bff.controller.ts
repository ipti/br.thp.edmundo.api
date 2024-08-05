import { Body, Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserResponse } from './doc/users-registration.response';
import { UpdateUserRegistrationDto } from './dto/update-user-registration.dto';
import { UserRegistrationBffService } from './service/user-registration-bff.service';


@ApiTags('User-Registration-bff')
@Controller('user-registration-bff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UserRegistrationBffController {
  constructor(private UserService: UserRegistrationBffService) { }

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
