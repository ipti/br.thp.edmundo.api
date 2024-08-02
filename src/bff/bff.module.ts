import { Module } from '@nestjs/common';
import { UserRegistrationBffModule } from './user_registration-bff/user-registration-bff.module';
import { ReapplicationBffModule } from './reapplication-bff/reapplication-bff.module';
import { ClassroomBffModule } from './classroom-bff/classroom-bff.module';

@Module({
  imports: [
    UserRegistrationBffModule,
    ReapplicationBffModule,
    ClassroomBffModule,
  ],
})
export class BFFModule { }
