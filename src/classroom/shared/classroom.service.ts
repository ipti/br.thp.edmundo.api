import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClassroomDto } from '../dto/create-classroom.dto';
import { UpdateClassroomDto } from '../dto/update-classroom.dto';

@Injectable()
export class ClassroomService {
  constructor(private readonly prisma: PrismaService) { }

  async create(id: number, CreateClassroomDto: CreateClassroomDto) {
    const classroomRegistered = await this.prisma.classroom.findMany({
      where: { name: CreateClassroomDto.name },
    });

    if (classroomRegistered.length > 0) {
      throw new HttpException('Name already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const createdClassroom = await this.prisma.classroom.create({
        data: {
          name: CreateClassroomDto.name,
          owner_user_fk: id,
          reapplication: { connect: { id: CreateClassroomDto.reapplication } },
        },
      });

      await this.prisma.user_classroom.create({
        data: {
          classroom: { connect: { id: createdClassroom.id } },
          users: { connect: { id: id } }
        }
      })

      return createdClassroom;
    } catch (err) {
      console.log(err)
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const classrooms = await this.prisma.classroom.findMany();
      return classrooms;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const classroom = await this.prisma.classroom.findUnique({
        where: { id: +id },
      });

      if (!classroom) {
        throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
      }

      return classroom;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, UpdateClassroomDto: UpdateClassroomDto) {
    try {
      const classroom = await this.prisma.classroom.findUnique({
        where: { id: +id },
      });

      if (!classroom) {
        throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
      }

      const updatedClassroom = await this.prisma.classroom.update({
        where: { id: +id },
        data: {
          ...UpdateClassroomDto,
        },
      });

      return updatedClassroom;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);


      await this.prisma.classroom.delete({
        where: { id: +id },
      });

      return { message: 'Classroom deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
