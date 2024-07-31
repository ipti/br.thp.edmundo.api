import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClassroomDto } from '../dto/create-classroom.dto';
import { UpdateClassroomDto } from '../dto/update-classroom.dto';

@Injectable()
export class ClassroomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(CreateClassroomDto: CreateClassroomDto) {
    const classroomRegistered = await this.prisma.classroom.findMany({
      where: { name: CreateClassroomDto.name },
    });

    if (classroomRegistered.length > 0) {
      throw new HttpException('Name already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const createdClassroom = await this.prisma.classroom.create({
        data: {
          ...CreateClassroomDto,
          project: { connect: { id: CreateClassroomDto.project } },
        },
      });

      return createdClassroom;
    } catch (err) {
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
          project: {},
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

      const register_classroom = await this.prisma.register_classroom.findMany({
        where: { classroom_fk: +id },
      });

      if (register_classroom.length > 0) {
        for (const i of register_classroom) {
          await this.prisma.register_classroom.delete({
            where: { id: i.id },
          });
        }
      }

      const meeting_classroom = await this.prisma.meeting.findMany({
        where: { classroom_fk: +id },
      });

      if (meeting_classroom.length > 0) {
        for (const i of meeting_classroom) {
          const meeting_archives = await this.prisma.meeting_archives.findMany({
            where: { meeting_fk: i.id },
          });

          if (meeting_archives.length > 0) {
            for (const m_a of meeting_archives) {
              await this.prisma.meeting_archives.delete({
                where: { id: m_a.id },
              });
            }
          }

          const meeting_user = await this.prisma.meeting_user.findMany({
            where: { meeting_fk: i.id },
          });

          if (meeting_user.length > 0) {
            for (const m_u of meeting_user) {
              await this.prisma.meeting_user.delete({
                where: {
                  meeting_fk_user_fk: {
                    meeting_fk: m_u.meeting_fk,
                    user_fk: m_u.user_fk,
                  },
                },
              });
            }
          }

          const meeting_fouls = await this.prisma.fouls.findMany({
            where: { meeting_fk: i.id },
          });

          if (meeting_fouls.length > 0) {
            for (const m_f of meeting_fouls) {
              await this.prisma.fouls.delete({
                where: {
                  id: m_f.id,
                },
              });
            }
          }

          const meeting_log = await this.prisma.meeting_log.findMany({
            where: { meeting_fk: i.id },
          });

          if (meeting_log.length > 0) {
            for (const m_l of meeting_log) {
              await this.prisma.meeting_log.delete({
                where: { id: m_l.id },
              });
            }
          }

          await this.prisma.meeting.delete({
            where: { id: i.id },
          });
        }
      }

      await this.prisma.classroom.delete({
        where: { id: +id },
      });

      return { message: 'Classroom deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
