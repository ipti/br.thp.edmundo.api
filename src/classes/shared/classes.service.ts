import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/utils/jwt.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClassesDto } from '../dto/create-classes.dto';
import { UpdateClassesDto } from '../dto/update-classes.dto';
import { verifyAdmin } from 'src/utils/verifyFunc';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user: JwtPayload, CreateClassesDto: CreateClassesDto) {


    try {
      const createdclasses = await this.prisma.classes.create({
        data: {
          name: CreateClassesDto.name,
          module: { connect: { id: 1 } }
        },
      });

      return createdclasses;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const classess = await this.prisma.classes.findMany();
      return classess;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const reaplication = await this.prisma.classes.findUnique({
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
    UpdateClassesDto: UpdateClassesDto,
  ) {
    try {

      this.findOne(id);

      const updatedreaplication = await this.prisma.classes.update({
        where: { id: +id },
        data: { ...UpdateClassesDto },
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

      await this.prisma.classes.delete({
        where: { id: +id },
      });

      return { message: 'reaplication deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
