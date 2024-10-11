import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/utils/jwt.interface';
import { AzureProviderService } from 'src/utils/middleware/azure.provider';
import { UserActivitiesDto } from '../dto/user_activities.dto';

@Injectable()
export class UserActivitiesBffService {
  constructor(
    readonly prismaService: PrismaService,
    readonly azureService: AzureProviderService,
  ) { }

  async findUserActivities(id: number, user: JwtPayload) {
    try {
      const activities = await this.prismaService.user_activities.findUnique({
        where: {
          id: +id,
        },
        include: {
          user_avaliation: true,
          activities: {
            select: {
              classroom_activities: {
                select: {
                  classroom_avaliation: true
                }
              },
              name: true,
              points_activities: true,
              time_activities: true
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
        }
      })

      return user_avaliation
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
          id: id
        },
        data: {
          user_activities: { connect: { id: id } },
          ...userActivitiesDto,
          total: userActivitiesDto.total,
        }
      })

      return user_avaliation
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
