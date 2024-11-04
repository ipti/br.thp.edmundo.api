import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassroomBffService {
  constructor(private readonly prismaService: PrismaService) {}

  async findClassroomUser(idUser: number) {
    try {
      const classroom = await this.prismaService.classroom.findMany({
        where: {
          user: {
            some: {
              usersId: idUser,
            },
          },
        },
        include: {
          user: {
            include: {
              users: {
                select: {
                  name: true,
                  registration: {
                    select: {
                      avatar_url: true,
                    },
                  },
                },
              },
            },
            where: {
              users: {
                role: 'STUDENT',
              },
            },
          },
          classroom_module: {
            select: {
              module: true,
              active: true,
            },
          },
        },
      });

      if (!classroom) {
        throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
      }

      return classroom;
    } catch (err) {
      throw new HttpException(err.message || err, HttpStatus.BAD_REQUEST);
    }
  }

  async findClassroomActivitiesUser(id: number) {
    try {
      const classroom = await this.prismaService.classroom.findUnique({
        where: {
          id: id,
        },
        select: {
          name: true,
          id: true,
          classroom_module: {
            select: {
              id: true,
              classroom: {
                select: {
                  classroom_activities: {
                    select: {
                      id: true,
                      activities: {
                        select: {
                          name: true,
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
              module: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!classroom) {
        throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
      }

      return classroom;
    } catch (err) {
      throw new HttpException(err.message || err, HttpStatus.BAD_REQUEST);
    }
  }

  async findClassroomReapplication(idUser: number, idReapplication?: number) {
    try {
      // Condição para verificar se idReapplication foi fornecido

      const whereCondition = idReapplication
        ? {
            reapplication_fk: idReapplication,
            user: {
              some: { usersId: +idUser },
            },
          }
        : {
            user: {
              some: { usersId: +idUser },
            },
          };

      const reapplication = await this.prismaService.classroom.findMany({
        where: whereCondition,
        include: {
          _count: {
            select: {
              user: true,
            },
          },
        },
      });

      if (!reapplication) {
        throw new HttpException(
          'reapplication not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return reapplication;
    } catch (err) {
      throw new HttpException(err.message || err, HttpStatus.BAD_REQUEST);
    }
  }

  async jointheClassroom(idUser: number, idClassroom: number) {
    try {
      const user_classroom = await this.prismaService.user_classroom.findMany({
        where: {
          classroomId: idClassroom,
          usersId: idUser,
        },
      });

      if (user_classroom.length > 0) {
        throw new HttpException(
          'Usuário já pertence a turma',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prismaService.user_classroom.create({
        data: {
          classroom: { connect: { id: idClassroom } },
          users: { connect: { id: idUser } },
        },
      });

      return { message: 'Usuário adicionado com sucesso!' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const classroom = await this.prismaService.classroom.findUnique({
        where: { id: +id },
        include: {
          _count: {
            select: {
              user: true,
            },
          },
        },
      });

      const owner = await this.prismaService.users.findUnique({
        where: { id: classroom.owner_user_fk },
        select: { id: true, name: true, email: true },
      });

      if (!classroom) {
        throw new HttpException('Turma não encontrada', HttpStatus.NOT_FOUND);
      }

      return { classroom: classroom, owner: owner };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneMembers(id: string) {
    try {
      const classroom = await this.prismaService.classroom.findUnique({
        where: { id: +id },
        include: {
          user: {
            include: {
              users: {
                select: {
                  name: true,
                  role: true,
                  registration: {
                    select: {
                      avatar_url: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const owner = await this.prismaService.users.findUnique({
        where: { id: classroom.owner_user_fk },
        select: { id: true, name: true, email: true },
      });

      if (!classroom) {
        throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
      }

      return { classroom: classroom, owner: owner };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
