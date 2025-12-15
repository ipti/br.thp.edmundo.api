import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateClassroomClassesDto } from '../dto/update-classrom-classes.dto';
import { UpdateViewdClassesDto } from '../dto/viewd-classes.dto';

@Injectable()
export class ClasseBffService {
  constructor(private readonly prismaService: PrismaService) { }
  async findClassesClassroom(id: number) {
    try {
      const classes = await this.prismaService.classroom_module.findMany({
        where: { classroom_fk: id },
        include: {
          module: {
            select: {
              name: true,
              classes: {
                where: {
                  classroom_classes: {
                    some: {
                      classroom_fk: id,
                    }
                  }
                }
              }
            },
          },
        }
      });

      if (!classes) {
        throw new HttpException('aula not found', HttpStatus.NOT_FOUND);
      }

      return classes;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }


  async updateClassroomClasse(
    id: number,
    UpdateClassroomClasseDto: UpdateClassroomClassesDto,
  ) {
    try {
      const Classe = await this.prismaService.classroom_classes.findUnique({
        where: { id: +id },
      });

      if (!Classe) {
        throw new HttpException('Classe not found', HttpStatus.NOT_FOUND);
      }

      await this.prismaService.classroom_classes.update({
        data: {
          active: UpdateClassroomClasseDto.active,
        },
        where: { id: +id },

      })

      return { message: 'Aleração feita com sucesso!' };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }


  async addClasse(idClasse: number, idClassroom: number) {
    try {
      const Classe = await this.prismaService.classes.findUnique({
        where: { id: +idClasse },
      });

      const classroom = await this.prismaService.classroom.findUnique({
        where: { id: +idClassroom },
      });

      if (!Classe) {
        throw new HttpException('Classe not found', HttpStatus.NOT_FOUND);
      }

      if (!classroom) {
        throw new HttpException('classroom not found', HttpStatus.NOT_FOUND);
      }

      const classroom_Classe =
        await this.prismaService.classroom_classes.findFirst({
          where: {
            classroom_fk: idClassroom,
            classes_fk: idClasse,
          }
        });

      if (classroom_Classe) {
        throw new HttpException('Turma já possui módulo', HttpStatus.NOT_FOUND);
      }

      await this.prismaService.classroom_classes.create({
        data: {
          classroom: { connect: { id: idClassroom } },
          classes: { connect: { id: idClasse } },
          active: true
        },

      })

      return { message: 'Módulo adicionado com sucesso' };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async ViewdClasse(dto: UpdateViewdClassesDto) {
    try {
      const Classe = await this.prismaService.classes.findUnique({
        where: { id: +dto.idClasse },
        include: { activities: true }
      });

      const users = await this.prismaService.users.findUnique({
        where: { id: +dto.idUser },
      });

      if (!Classe) {
        throw new HttpException('Classe not found', HttpStatus.NOT_FOUND);
      }

      if (!users) {
        throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
      }

      const user_activities = await this.prismaService.user_activities.findMany({
        where: {
          user_classroom: {
            usersId: dto.idUser
          },
          activities: {
            classesId: dto.idClasse
          }
        }
      });

      
      if (user_activities.some(activity => activity.status !== 'COMPLETED') || (user_activities.length === 0 && Classe.activities.length > 0)) {
        throw new HttpException('Conclua as atividades para finalizar a aula!', HttpStatus.NOT_MODIFIED);
      }

      const user_classes =
        await this.prismaService.user_classes.findFirst({
          where: {
            user_fk: dto.idUser,
            classes_fk: dto.idClasse,
          }
        });

      if (user_classes) {
        await this.prismaService.user_classes.update({
          where: {
            id: user_classes.id
          },
          data: {
            viewed: !user_classes.viewed
          },
        })
      } else {
        await this.prismaService.user_classes.create({
          data: {
            users: { connect: { id: dto.idUser } },
            classes: { connect: { id: dto.idClasse } },
            viewed: true
          },
        })
      }

      return { message: 'Módulo adicionado com sucesso' };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

}


