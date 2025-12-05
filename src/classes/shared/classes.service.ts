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
          objective: CreateClassesDto.objective,
          duration: CreateClassesDto.duration,
          necessary_material: CreateClassesDto.necessary_material,
          content: CreateClassesDto.content,
          module: { connect: { id: CreateClassesDto.module_id } }
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
      // verifyAdmin(user);

      await this.findOne(id);

      const classroom_classes = await this.prisma.classroom_classes.findMany({
        where: {
          classes_fk: +id
        }
      })

      if (classroom_classes.length > 0) {
        throw new HttpException(
          'Não foi possivel excluir aula por ter turmas vinculadas!',
          HttpStatus.NOT_FOUND,
        );
      }


      const activities = await this.prisma.activities.findMany({
        where: {
          classesId: +id
        }
      })

      if (activities.length > 0) {
        throw new HttpException(
          'Não foi possivel excluir aula por ter atividades vinculadas!',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.classes.delete({
        where: { id: +id },
        include: {
          activities: true,
          classroom_classes: true,
          module: true
        }
      });

      return { message: 'reaplication deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
