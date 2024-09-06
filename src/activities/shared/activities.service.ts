import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/utils/jwt.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateActivitiesDto } from '../dto/create-activities.dto';
import { UpdateActivitiesDto } from '../dto/update-activities.dto';
import { verifyAdmin } from 'src/utils/verifyFunc';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user: JwtPayload, CreateActivitiesDto: CreateActivitiesDto) {


    try {
      const createdactivities = await this.prisma.activities.create({
        data: {
          points_activities: 0,
          name: CreateActivitiesDto.name,
          difficult: CreateActivitiesDto.difficult,
          time_activities: CreateActivitiesDto.time_activities,
          type_activities: CreateActivitiesDto.type_activities,
          classes: { connect: { id: CreateActivitiesDto.id_classes } },
        },
      });

      return createdactivities;
    } catch (err) {
      console.log(err)
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
        data: { ...UpdateActivitiesDto },
      });

      return updatedActivities;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(user: JwtPayload, id: string) {
    try {
      verifyAdmin(user);

      await this.findOne(id);

      await this.prisma.activities.delete({
        where: { id: +id },
      });

      return { message: 'activitie deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
