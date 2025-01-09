import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateClassroomActivitiesDto } from '../dto/update-classrom-activities.dto';
import { JwtPayload } from 'src/utils/jwt.interface';
import { AzureProviderService } from 'src/utils/middleware/azure.provider';
import { ClassroomAvaliationDto } from '../dto/classroom_avaliation';

@Injectable()
export class ActivitiesBffService {
  constructor(
    readonly prismaService: PrismaService,
    readonly azureService: AzureProviderService,
  ) { }

  async findActivities(id: number, user: JwtPayload) {
    try {
      const activities = await this.prismaService.activities.findUnique({
        where: {
          id: +id,
        },
        include: {
          activities_group: {
            include: {
              groups: {
                include: {
                  metric_group: true
                }
              }
            },
          },
          tags_activities: {
            include: {
              tag: true,
            },
          },
          form: {
            include: {
              question: {
                include: {
                  options: true,
                },
              },
              answer_form: {
                where: {
                  users_fk: user.id,
                },
                select: {
                  answer_question: {
                    select: {
                      question: {
                        select: {
                          type: true,
                          content: true,
                          options: true,
                        },
                      },
                      answer_option: true,
                    },
                  },
                },
              },
            },
          },
          user_activities: {
            include: {
              user_avaliation: {
                select: {
                  total: true,
                },
              },
            },
            where: {
              user_classroom: {
                usersId: user.id,
              },
            },
          },
        },
      });

      if (!activities) {
        throw new HttpException('activities not found', HttpStatus.NOT_FOUND);
      }

      return activities;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findActivitiesOne(id: number) {
    try {
      const activities = await this.prismaService.activities.findUnique({
        where: { id: +id },
        include: {
          tags_activities: {
            include: {
              tag: true,
            },
          },
          activities_group: {
            include: {
              groups: true
            }
          },
          form: {
            include: {
              question: {
                include: {
                  options: true,
                  response_question: true,
                },
              },
            },
          },
        },
      });

      if (!activities) {
        throw new HttpException('activities not found', HttpStatus.NOT_FOUND);
      }

      return activities;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findActivitiesUser(id: number) {
    try {
      const activities =
        await this.prismaService.classroom_activities.findUnique({
          where: {
            id: id,
          },
          select: {
            id: true,
            activities: {
              select: {
                type_activities: true,
                classroom_activities: {
                  select: {
                    id: true,
                    classroom_avaliation: true,
                  },
                },
                user_activities: {
                  where: {
                    user_classroom: {
                      classroom: {
                        classroom_activities: {
                          some: {
                            id: id,
                          },
                        },
                      },
                    },
                  },
                  select: {
                    user_avaliation: {
                      select: {
                        total: true,
                      },
                    },
                    id: true,
                    createdAt: true,
                    status: true,
                    user_activities_archives: true,
                    user_classroom: {
                      select: {
                        users: {
                          select: {
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
                name: true,
              },
            },
          },
        });

      if (!activities) {
        throw new HttpException('activities not found', HttpStatus.NOT_FOUND);
      }

      return activities;
    } catch (err) {
      console.log(err);
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
      });

      return { message: 'Aleração feita com sucesso!' };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addActivities(idActivities: number, idClassroom: number) {
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
          },
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
          active: true,
        },
      });

      return { message: 'Atividade adicionada com sucesso' };
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addUserActivities(
    idActivities: number,
    idClassroom: number,
    user: number,
  ) {
    try {
      const user_classroom = await this.prismaService.user_classroom.findFirst({
        where: {
          classroomId: idClassroom,
          usersId: user,
        },
      });

      const activities = await this.prismaService.user_activities.create({
        data: {
          user_classroom: { connect: { id: user_classroom.id } },
          activities: { connect: { id: idActivities } },
        },
      });

      return activities;
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async FinishUserActivities(id: number, file: any[]) {
    try {
      const transactionResult = this.prismaService.$transaction(async (tx) => {
        if (file) {
          for (const i of file) {
            const fileAzure = await this.azureService.uploadFile(
              i,
              'activities',
            );

            await tx.user_activities_archives.create({
              data: {
                original_name: i.originalname,
                size: i.size,
                archive_url: fileAzure,
                user_activities: { connect: { id: id } },
              },
            });
          }
        }

        await tx.user_activities.update({
          where: {
            id: id,
          },
          data: {
            status: 'COMPLETED',
          },
        });

        return { message: 'Atividade concluída!' };
      });

      return transactionResult;
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async avaliationActivities(
    id: number,
    userActivitiesDto: ClassroomAvaliationDto,
  ) {
    try {
      const classroom_activities =
        await this.prismaService.classroom_activities.findFirst({
          where: {
            id: id,
          },
        });

      if (!classroom_activities) {
        throw new HttpException(
          'classroom_activities not found',
          HttpStatus.NOT_FOUND,
        );
      }

      const user_avaliation =
        await this.prismaService.classroom_avaliation.create({
          data: {
            classroom_activities: { connect: { id: id } },
            ...userActivitiesDto,
          },
        });

      return user_avaliation;
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateavaliationActivities(
    id: number,
    userActivitiesDto: ClassroomAvaliationDto,
  ) {
    try {
      const user_activities =
        await this.prismaService.classroom_avaliation.findFirst({
          where: {
            id: id,
          },
        });

      if (!user_activities) {
        throw new HttpException('activities not found', HttpStatus.NOT_FOUND);
      }

      const user_avaliation =
        await this.prismaService.classroom_avaliation.update({
          where: {
            id: id,
          },
          data: {
            classroom_activities: { connect: { id: id } },
            ...userActivitiesDto,
          },
        });

      return user_avaliation;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addImageEditor(file: any) {
    let img_link;

    try {
      if (file) {
        const fileAzure = await this.azureService.uploadFile(
          file,
          'editor-activities',
        );
        img_link = fileAzure;
      }
      return img_link;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
