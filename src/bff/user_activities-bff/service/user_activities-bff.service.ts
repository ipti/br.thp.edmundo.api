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
import axios from 'axios';

@Injectable()
export class UserActivitiesBffService {
  constructor(
    readonly prismaService: PrismaService,
    readonly azureService: AzureProviderService,
  ) { }

  async findUserActivities(id: number, idClassroom: number) {
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
          answer_user_activities_group_avaliation: {
            include: {
              group_avaliation: true,
            },
          },
          answer_user_activities_ia: {
            include: {
              answer_user_activities_ia_group_avaliation: true,
            },
          },
          user_avaliation: true,
          activities: {
            select: {
              type_activities: true,
              description: true,
              form: {
                select: {
                  answer_form: {
                    where: {
                      classroom_fk: idClassroom,
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

  async avaliationActivitiesAll(idClassroomActivities: number) {
    try {
      const classroom_activities =
        await this.prismaService.classroom_activities.findFirst({
          where: {
            id: idClassroomActivities,
          },
          include: {
            activities: {
              select: {
                form: {
                  include: {
                    answer_form: {
                      where: {
                        classroom: {
                          classroom_activities: {
                            some: { id: idClassroomActivities },
                          },
                        },
                      },
                      include: {
                        answer_question: {
                          include: {
                            answer_option: true,
                            question: {
                              select: {
                                response_question: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                user_activities: {
                  where: {
                    user_classroom: {
                      classroom: {
                        classroom_activities: {
                          some: {
                            id: idClassroomActivities,
                          },
                        },
                      },
                    },
                  },
                  select: {
                    user_avaliation: {
                      select: {
                        total: true,
                        id: true,
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
              },
            },
          },
        });

      if (!classroom_activities) {
        throw new HttpException(
          'classroom_activities not found',
          HttpStatus.NOT_FOUND,
        );
      }
      const handleNotaForm = (form: any) => {
        const total = form.answer_form[0].answer_question.length;

        let nota = 0;
        for (const question of form.answer_form[0].answer_question) {
          const totalQuestion = question?.question?.response_question?.length;

          let notaQuestion = 0;

          for (const i of question.question.response_question) {
            if (
              question.answer_option.find(
                (props) => props.options_fk === i.option_fk,
              )
            ) {
              notaQuestion++;
            }
          }
          nota = nota + notaQuestion / totalQuestion;
        }
        return (nota / total) * 10;
      };

      for (const user_activities of classroom_activities.activities
        .user_activities) {
        if (user_activities?.user_avaliation) {
          await this.prismaService.user_avaliation.update({
            where: { id: user_activities.user_avaliation.id },
            data: {
              total: handleNotaForm(classroom_activities.activities.form),
            },
          });
        } else {
          await this.prismaService.user_avaliation.create({
            data: {
              user_activities: { connect: { id: user_activities.id } },
              total: handleNotaForm(classroom_activities.activities.form),
            },
          });
        }
      }

      return classroom_activities;
    } catch (err) {
      console.log(err);
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
          user_activities: {
            connect: { id: user_activities.user_activities_fk },
          },
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

        for (const answer_user_activities_group_avaliation_table of body.student_answer) {
          const answer_user_activities_group_avaliation =
            await tx.answer_user_activities_group_avaliation.findFirst({
              where: {
                user_activities_fk: body.id_user_activities,
                group_avaliation_fk:
                  answer_user_activities_group_avaliation_table.idGroup,
              },
            });

          if (answer_user_activities_group_avaliation) {
            await tx.answer_user_activities_group_avaliation.update({
              where: { id: answer_user_activities_group_avaliation.id },
              data: {
                answer: answer_user_activities_group_avaliation_table.answer,
              },
            });
          } else {
            await tx.answer_user_activities_group_avaliation.create({
              data: {
                answer: answer_user_activities_group_avaliation_table.answer,
                user_activities: { connect: { id: body.id_user_activities } },
                group_avaliation: {
                  connect: {
                    id: answer_user_activities_group_avaliation_table.idGroup,
                  },
                },
              },
            });
          }
        }

        const convertStudentAnswer = (students: StudentAnswerDto[]) => {
          let concac = '';
          students.forEach((item) => {
            concac = concac + `<${item.name}>${item.answer}</${item.name}>`;
          });

          return concac;
        };

        const send_ia: SendIADto = {
          id_response: body.id_user_activities,
          performanceMetrics: body.performanceMetrics,
          tasksDescription: body.tasksDescription,
          student_answer: convertStudentAnswer(body.student_answer),
        };

        const url =
          process.env.API_BASE_AI +
          '/api/process?token=' +
          process.env.API_BASE_AI_TOKEN +
          '&webhook=' +
          process.env.URL_WEBHOOK;

        const gpt = await axios.post(url, send_ia);

        return gpt.data;
      });

      return transaction;
    } catch (err) {
      console.log(err);
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

        let grade = 0;

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

          let metricGrade = 0;
          for (const metrics of performanceEvaluation.metrics) {
            metricGrade = metricGrade + metrics.grade;

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

          //Converter centana para dezena
          grade =
            (metricGrade / 10 + grade) / body.performanceEvaluation.length;
        }

        const user_avaliation = await tx.user_avaliation.findFirst({
          where: {
            user_activities_fk: body.id_response
          }
        })

        if (user_avaliation) {
          await tx.user_avaliation.update({
            where: {
              id: user_avaliation.id
            },
            data: {
              total: grade,
            },
          });
        } else {
          await tx.user_avaliation.create({
            data: {
              user_activities: { connect: { id: body.id_response } },
              total: grade,
            },
          });
        }



        return user_activities;
      });
      return transaction;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
