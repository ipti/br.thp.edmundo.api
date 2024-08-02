import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/utils/jwt.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReapplicationDto } from '../dto/create-reapplication.dto';
import { UpdateReapplicationDto } from '../dto/update-reaplication.dto';
import { verifyAdmin } from 'src/utils/verifyFunc';

@Injectable()
export class ReapplicationService {
  constructor(private readonly prisma: PrismaService) { }

  async create(
    user: JwtPayload,
    CreateReapplicationDto: CreateReapplicationDto,
  ) {
    const reapplicationRegistered = await this.prisma.reapplication.findMany({
      where: { name: CreateReapplicationDto.name },
    });

    if (reapplicationRegistered.length > 0) {
      throw new HttpException('Name already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const createdReapplication = await this.prisma.reapplication.create({
        data: {
          name: CreateReapplicationDto.name,
          active: true
        },
      });

      await this.prisma.user_reapplication.create({
        data: {
          reapplication: { connect: { id: createdReapplication.id } },
          users: { connect: { id: user.id } }
        }
      })


      return createdReapplication;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const reapplications = await this.prisma.reapplication.findMany();
      return reapplications;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const reaplication = await this.prisma.reapplication.findUnique({
        where: { id: +id },
      });

      if (!reaplication) {
        throw new HttpException('reaplication not found', HttpStatus.NOT_FOUND);
      }

      return reaplication;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    user: JwtPayload,
    id: string,
    UpdateReapplicationDto: UpdateReapplicationDto,
  ) {
    try {

      this.findOne(id);

      const updatedreaplication = await this.prisma.reapplication.update({
        where: { id: +id },
        data: { ...UpdateReapplicationDto },
      });

      return updatedreaplication;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(user: JwtPayload, id: string) {
    try {
      verifyAdmin(user);

      await this.findOne(id);

      await this.prisma.reapplication.delete({
        where: { id: +id },
      });

      return { message: 'reaplication deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
