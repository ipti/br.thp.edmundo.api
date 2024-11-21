import { Module } from '@nestjs/common';
import { ActivitiesBffModule } from './activities-bff/activities-bff.module';
import { ClasseBffModule } from './classe-bff/classes-bff.module';
import { ClassroomBffModule } from './classroom-bff/classroom-bff.module';
import { ModuleBffModule } from './module-bff/module-bff.module';
import { ReapplicationBffModule } from './reapplication-bff/reapplication-bff.module';
import { UserRegistrationBffModule } from './user_registration-bff/user-registration-bff.module';
import { UserActivitiesBffModule } from './user_activities-bff/user_activities-bff.module';
import { FormBffModule } from './form-bff/form-bff.module';
import { ChartBffModule } from './chart-bff/chart-bff.module';
import { TagsBffModule } from './tags-bff/tag-bff.module';
import { StampsBffModule } from './stamps-bff/stamps-bff.module';
import { MigrationBffModule } from './migration-bff/migration-bff.module';

@Module({
  imports: [
    UserRegistrationBffModule,
    ReapplicationBffModule,
    ClassroomBffModule,
    ModuleBffModule,
    ActivitiesBffModule,
    ClasseBffModule,
    UserActivitiesBffModule,
    FormBffModule,
    ChartBffModule,
    TagsBffModule,
    StampsBffModule,
    MigrationBffModule
  ],
})
export class BFFModule { }
