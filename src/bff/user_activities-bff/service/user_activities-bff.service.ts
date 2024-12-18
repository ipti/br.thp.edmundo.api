import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/utils/jwt.interface';
import { AzureProviderService } from 'src/utils/middleware/azure.provider';
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
            }
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
                                id: id
                              }
                            }
                          }
                        }
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
}
