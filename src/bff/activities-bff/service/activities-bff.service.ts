import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateClassroomActivitiesDto } from '../dto/update-classrom-activities.dto';

@Injectable()
export class ActivitiesBffService {
  constructor(private readonly prismaService: PrismaService) { }

  async findActivities(id: number) {
    try {
      const activities = await this.prismaService.activities.findUnique({
        where: { id: +id },
        include: {
          classes: {
            include: {
              activities: true,
            }
          }
        }
      });

      if (!activities) {
        throw new HttpException('activities not found', HttpStatus.NOT_FOUND);
      }

      return activities;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateClassroomActivities(
    id: number,
    UpdateClassroomActivitiesDto: UpdateClassroomActivitiesDto,
  ) {
    try {
      const activities =
        await this.prismaService.classroom_activities.findUnique({
          where: { id: +id },
      });

      if (!activities) {
        throw new HttpException('.activities not found', HttpStatus.NOT_FOUND);
      }

      await this.prismaService.classroom_activities.update({
        data: {
          active: UpdateClassroomActivitiesDto.active,
        },
        where: { id: +id },

      })

      return { message: 'Aleração feita com sucesso!' };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }


  async addActivities(idActivities: number, idClassroom: number) {

    console.log(idActivities, idClassroom)
    try {
      const activities = await this.prismaService.activities.findFirst({
        where: { id: +idActivities },
      });

      const classroom = await this.prismaService.classroom.findFirst({
        where: { id: +idClassroom },
      });

      if (!activities) {
        throw new HttpException('activities not found', HttpStatus.NOT_FOUND);
      }

      if (!classroom) {
        throw new HttpException('classroom not found', HttpStatus.NOT_FOUND);
      }

      const classroom_activities =
        await this.prismaService.classroom_activities.findFirst({
          where: {
            classroom_fk: idClassroom,
            activities_fk: idActivities,
          }
        });

      if (classroom_activities) {
        throw new HttpException(
          'Turma já possui Atividade',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prismaService.classroom_activities.create({
        data: {
          classroom: { connect: { id: idClassroom } },
          activities: { connect: { id: idActivities } },
          active: true
        },

      })

      return { message: 'Atividade adicionada com sucesso' };
    } catch (err) {
      console.log(err)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

}


