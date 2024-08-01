import { Module } from '@nestjs/common';
import { RegistrationTokenBffModule } from './Registration-token-bff/registrationtoken-bff.module';
import { ArchivesMeetingModule } from './archives-meeting-bff/archives.module';
import { ArchivesProjectModule } from './archives-project-bff/archives.module';
import { ClassroomBffModule } from './classroom-bff/classroom.module';
import { EventRegistrationBffModule } from './event_registration-bff/event_registration.module';
import { FoulsBffModule } from './fouls-bff/fouls-bff.module';
import { MeetingBffModule } from './meeting-bff/meeting.module';
import { ProjectBffModule } from './project-bff/project-bff.module';
import { ProjectUserBffModule } from './project-user-bff/project-user-bff.module';
import { RegistrationClassroomBffModule } from './register-classroom-bff/register-classroom-bff.module';
import { RegistrationBffModule } from './registration-bff/registration-bff.module';
import { SocialTechnologyBffModule } from './social-technology-bff/social-technology-bff.module';
import { UserBffModule } from './user-bff/user-bff.module';

@Module({
  imports: [
    RegistrationBffModule,
    ProjectBffModule,
    ClassroomBffModule,
    EventRegistrationBffModule,
    RegistrationTokenBffModule,
    ProjectUserBffModule,
    UserBffModule,
    MeetingBffModule,
    FoulsBffModule,
    ArchivesMeetingModule,
    SocialTechnologyBffModule,
    RegistrationClassroomBffModule,
    ArchivesProjectModule,
  ],
})
export class BFFModule {}
