import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateClassroomClassesDto } from '../dto/update-classrom-classes.dto';

@Injectable()
export class ClasseBffService {
  constructor(private readonly prismaService: PrismaService) { }
  async findClassesClassroom(id: number) {
    try {
      const classes = await this.prismaService.classroom_module.findMany({
        where: { classroom_fk: id },
        include: {
          module: {
            select:{
              name: true
            }
          },
          classroom: {
            select: {
              classroom_classes: {
                select: {
                  classes: {
                    select: {
                      active: true,
                      name: true,
                    }
                  }
                }
              },
            },
            // include: {
            //   classroom_classes: {
            //     include: {
            //       classes: {
            //         select: {
            //           name: true,
            //           active: true,
            //         }
            //       },

            //     }
            //   }
            // }
          }
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

      const classroom = await this.prismaService.classes.findUnique({
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
          active: false
        },

      })

      return { message: 'Módulo adicionado com sucesso' };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

}


