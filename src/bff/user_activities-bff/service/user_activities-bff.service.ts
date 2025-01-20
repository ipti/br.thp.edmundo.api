import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AzureProviderService } from 'src/utils/middleware/azure.provider';
import { ResponseAnswerDto } from '../dto/answer_ia.dto';
import {
  CreateAnswerIADto,
  StudentAnswerDto,
} from '../dto/answer_user_activities.dto';
import { SendIADto } from '../dto/send_ia.dto';
import { UserActivitiesDto } from '../dto/user_activities.dto';
import { UserActivitiesRatingDto } from '../dto/user_activities_rating.dto';

@Injectable()
export class UserActivitiesBffService {
  constructor(
    readonly prismaService: PrismaService,
    readonly azureService: AzureProviderService,
  ) {}

  async findUserActivities(id: number) {
    try {
      const activities = await this.prismaService.user_activities.findUnique({
        where: {
          id: +id,
        },
        include: {
          user_activities_rating: {
            select: {
              rating: true,
            },
          },
          user_avaliation: true,
          activities: {
            select: {
              type_activities: true,
              form: {
                select: {
                  answer_form: {
                    where: {
                      users: {
                        user_classroom: {
                          some: {
                            user_activities: {
                              some: {
                                id: id,
                              },
                            },
                          },
                        },
                      },
                    },
                    select: {
                      answer_question: {
                        select: {
                          question: {
                            select: {
                              type: true,
                              content: true,
                              options: true,
                              response_question: true,
                            },
                          },
                          answer_option: true,
                        },
                      },
                    },
                  },
                },
              },
              classroom_activities: {
                select: {
                  classroom_avaliation: true,
                },
              },
              name: true,
              points_activities: true,
              time_activities: true,
            },
          },
          user_activities_archives: true,
          user_classroom: {
            select: {
              users: {
                select: {
                  name: true,
                  id: true,
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

  async avaliationActivities(id: number, userActivitiesDto: UserActivitiesDto) {
    try {
      const user_activities =
        await this.prismaService.user_activities.findFirst({
          where: {
            id: id,
          },
        });

      if (!user_activities) {
        throw new HttpException('activities not found', HttpStatus.NOT_FOUND);
      }

      const user_avaliation = await this.prismaService.user_avaliation.create({
        data: {
          user_activities: { connect: { id: id } },
          ...userActivitiesDto,
          total: userActivitiesDto.total,
        },
      });

      return user_avaliation;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateavaliationActivities(
    id: number,
    userActivitiesDto: UserActivitiesDto,
  ) {
    try {
      const user_activities =
        await this.prismaService.user_avaliation.findFirst({
          where: {
            id: id,
          },
        });

      if (!user_activities) {
        throw new HttpException('activities not found', HttpStatus.NOT_FOUND);
      }

      const user_avaliation = await this.prismaService.user_avaliation.update({
        where: {
          id: id,
        },
        data: {
          user_activities: { connect: { id: id } },
          ...userActivitiesDto,
          total: userActivitiesDto.total,
        },
      });

      return user_avaliation;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async ratingUser(id: number, body: UserActivitiesRatingDto) {
    try {
      const user_activities_rating =
        await this.prismaService.user_activities_rating.create({
          data: {
            rating: body.rating,
            user_activities: { connect: { id: id } },
          },
        });
      return user_activities_rating;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async sendAnswerIA(body: CreateAnswerIADto) {
    try {
      const transaction = await this.prismaService.$transaction(async (tx) => {
        await tx.user_activities.update({
          data: {
            status: 'AWAITING_RESPONSE',
          },
          where: {
            id: body.id_user_activities,
          },
        });

        for (const answer_user_activities_group_avaliation of body.student_answer) {
          await tx.answer_user_activities_group_avaliation.create({
            data: {
              answer: answer_user_activities_group_avaliation.answer,
              user_activities: { connect: { id: body.id_user_activities } },
              group_avaliation: {
                connect: {
                  id: answer_user_activities_group_avaliation.idGroup,
                },
              },
            },
          });
        }

        const convertStudentAnswer = (students: StudentAnswerDto[]) => {
          let concac;
          students.map((item) => {
            return concac + `<${item.name}>${item.answer}</${item.name}>`;
          });
          return concac;
        };

        const send_ia: SendIADto = {
          id_response: body.id_user_activities,
          performanceMetrics: body.performanceMetrics,
          correctAnswer: body.correctAnswer,
          tasksDescription: body.tasksDescription,
          student_answer: convertStudentAnswer(body.student_answer),
        };

        return send_ia;
      });

      return transaction;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getToken(token: string) {
    try {
      if (!token) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      const key_token = await this.prismaService.key_token.findFirst({
        where: {
          token: token,
        },
      });

      if (!key_token) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      return key_token;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async answerIA(body: ResponseAnswerDto, token: string) {
    try {
      await this.getToken(token);
      const transaction = await this.prismaService.$transaction(async (tx) => {
        const user_activities = await tx.user_activities.update({
          data: {
            status: 'COMPLETED',
          },
          where: {
            id: body.id_response,
          },
        });

        const answer_user_activities_ia =
          await tx.answer_user_activities_ia.create({
            data: {
              analyzerFeedback: body.analyzerFeedback,
              user_activities: { connect: { id: body.id_response } },
            },
          });

        for (const performanceEvaluation of body.performanceEvaluation) {
          const answer_user_activities_ia_group_avaliation =
            await tx.answer_user_activities_ia_group_avaliation.create({
              data: {
                answer_user_activities_ia: {
                  connect: { id: answer_user_activities_ia.id },
                },
                group_avaliation: {
                  connect: {
                    id: performanceEvaluation.idGroup,
                  },
                },
              },
            });

          for (const metrics of performanceEvaluation.metrics) {
            await tx.answer_user_activities_ia_group_avaliation_metrics.create({
              data: {
                grade: metrics.grade,
                answer_user_activities_ia_group_avaliation: {
                  connect: {
                    id: answer_user_activities_ia_group_avaliation.id,
                  },
                },
                metric_group_avaliation: {
                  connect: { id: metrics.idMetric },
                },
              },
            });
          }
        }

        return user_activities;
      });
      return transaction;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
