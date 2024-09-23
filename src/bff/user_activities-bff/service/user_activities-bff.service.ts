import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/utils/jwt.interface';
import { AzureProviderService } from 'src/utils/middleware/azure.provider';

@Injectable()
export class UserActivitiesBffService {
  constructor(
    readonly prismaService: PrismaService,
    readonly azureService: AzureProviderService
  ) { }

  async findUserActivities(id: number, user: JwtPayload) {
    try {
      const activities = await this.prismaService.user_activities.findUnique({
        where: {
          id: +id,
        },
        include: {
          activities: {
            select: {
              name: true,
              points_activities: true,
            }
          },
          user_activities_archives: true,
          user_classroom: {
            select: {
              users: {
                select: {
                  name: true,
                  id: true
                }
              }
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




}


