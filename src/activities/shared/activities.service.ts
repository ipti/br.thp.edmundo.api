import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/utils/jwt.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateActivitiesDto } from '../dto/create-activities.dto';
import { UpdateActivitiesDto } from '../dto/update-activities.dto';
import { verifyAdmin } from 'src/utils/verifyFunc';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: JwtPayload, CreateActivitiesDto: CreateActivitiesDto) {
    try {
      const transactionResult = this.prisma.$transaction(async (tx) => {
        const createdactivities = await tx.activities.create({
          data: {
            points_activities: 10,
            name: CreateActivitiesDto.name,
            difficult: CreateActivitiesDto.difficult,
            time_activities: CreateActivitiesDto.time_activities,
            type_activities: CreateActivitiesDto.type_activities,
            description: CreateActivitiesDto.description,
            expected_return: CreateActivitiesDto.expected_return,
            classes: { connect: { id: CreateActivitiesDto.id_classes } },
          },
        });

        if (createdactivities.type_activities === 'QUIZ') {
          await tx.form.create({
            data: {
              activities: { connect: { id: createdactivities.id } },
            },
          });
        }

        for (const groups of CreateActivitiesDto.groups) {
          await tx.activities_group_avaliation.create({
            data: {
              activities: {
                connect: { id: createdactivities.id },
              },
              group_avaliations: {
                connect: {
                  id: groups.idGroup,
                },
              },
            },
          });
        }

        return {
          message: 'Atividade criada com sucesso!',
          id: createdactivities.id,
        };
      });

      return transactionResult;
    } catch (err) {
      console.log(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const activities = await this.prisma.activities.findMany();
      return activities;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const activitie = await this.prisma.activities.findUnique({
        where: { id: +id },
      });

      if (!activitie) {
        throw new HttpException('activitie not found', HttpStatus.NOT_FOUND);
      }

      return activitie;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    user: JwtPayload,
    id: string,
    UpdateActivitiesDto: UpdateActivitiesDto,
  ) {
    try {
      this.findOne(id);
      const updatedActivities = await this.prisma.activities.update({
        where: { id: +id },
        data: {
          name: UpdateActivitiesDto.name,
          description: UpdateActivitiesDto.description,
          difficult: UpdateActivitiesDto.difficult,
          expected_return: UpdateActivitiesDto.expected_return,
          points_activities: UpdateActivitiesDto.points_activities,
          time_activities: UpdateActivitiesDto.time_activities,
          type_activities: UpdateActivitiesDto.type_activities,
        },
      });

      const group_activities =
        await this.prisma.activities_group_avaliation.findMany({
          where: {
            activitie_fk: +id,
          },
        });

      for (const group_activities_index of group_activities) {
        await this.prisma.activities_group_avaliation.delete({
          where: {
            id: group_activities_index.id,
          },
        });
      }

      for (const groups of UpdateActivitiesDto.groups) {
        await this.prisma.activities_group_avaliation.create({
          data: {
            activities: {
              connect: { id: +id },
            },
            group_avaliations: {
              connect: {
                id: groups.idGroup,
              },
            },
          },
        });
      }

      return updatedActivities;
    } catch (err) {
      console.log(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(user: JwtPayload, id: string) {
    try {
      // verifyAdmin(user);

      await this.findOne(id);

      const classroom_activities =
        await this.prisma.classroom_activities.findMany({
          where: {
            activities_fk: +id,
          },
        });

      if (classroom_activities.length > 0) {
        throw new HttpException(
          'Não foi possivel excluir atividades por ter turmas vinculadas!',
          HttpStatus.NOT_FOUND,
        );
      }

      const user_activities = await this.prisma.user_activities.findMany({
        where: {
          activities_fk: +id,
        },
      });

      if (user_activities.length > 0) {
        throw new HttpException(
          'Não foi possivel excluir atividade por ter alunos vinculados!',
          HttpStatus.NOT_FOUND,
        );
      }

      const form = await this.prisma.form.findFirst({
        where: {
          activitiesId: +id,
        },
        select: {
          question: true,
          id: true,
        },
      });

      if (form.question.length > 0) {
        throw new HttpException(
          'Não foi possivel excluir atividade por possuir um formulário vinculado!',
          HttpStatus.NOT_FOUND,
        );
      } else {
        await this.prisma.form.delete({
          where: {
            id: form.id,
          },
        });
      }

      await this.prisma.activities.delete({
        where: { id: +id },
      });

      return { message: 'activitie deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
