import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateClassroomModuleDto } from '../dto/update-classrom-module.dto';

@Injectable()
export class ModuleBffService {
  constructor(private readonly prismaService: PrismaService) { }

  async findModule(id: number) {
    try {
      const module = await this.prismaService.module.findUnique({
        where: { id: +id },
        include: {
          classes: {
            include: {
              activities: true,
            }
          }
        }
      });

      if (!module) {
        throw new HttpException('module not found', HttpStatus.NOT_FOUND);
      }

      return module;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findModuleAll(id: number) {
    try {
      const module = await this.prismaService.module.findMany({
        include: {
          classroom_module: {
            where: {
              classroom_fk: id
            }
          }
        }
      });

      if (!module) {
        throw new HttpException('module not found', HttpStatus.NOT_FOUND);
      }

      return module;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findModuleClassroom(id: number) {
    try {
      const module = await this.prismaService.module.findMany({
        where: {
          classroom_module: {
            some: {
              classroom_fk: +id,
            },
          },
        },
        include: {
          classroom_module: {
            where: {
              classroom_fk: +id,
            }
          },
          classes: {
            include: {
              classroom_classes: {
                where: {
                  classroom_fk: +id,
                }
              },
              activities: {
                include: {
                  classroom_activities: {
                    where: {
                      classroom_fk: +id
                    }
                  }
                }
              }
            }
          }

        }

      });

      if (!module) {
        throw new HttpException('module not found', HttpStatus.NOT_FOUND);
      }

      return module;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateClassroomModule(
    id: number,
    UpdateClassroomModuleDto: UpdateClassroomModuleDto,
  ) {
    try {
      const module = await this.prismaService.classroom_module.findUnique({
        where: { id: +id },
      });

      if (!module) {
        throw new HttpException('module not found', HttpStatus.NOT_FOUND);
      }

      await this.prismaService.classroom_module.update({
        data: {
          active: UpdateClassroomModuleDto.active,
        },
        where: { id: +id },

      })

      return { message: 'Aleração feita com sucesso!' };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }


  async AddModule(idModule: number, idClassroom: number) {
    try {
      const module = await this.prismaService.module.findFirst({
        where: { id: +idModule },
      });

      const classroom = await this.prismaService.classroom.findFirst({
        where: { id: +idClassroom },
      });


      if (!module) {
        throw new HttpException('module not found', HttpStatus.NOT_FOUND);
      }

      if (!classroom) {
        throw new HttpException('classroom not found', HttpStatus.NOT_FOUND);
      }

      const classroom_module =
        await this.prismaService.classroom_module.findFirst({
          where: {
            classroom_fk: idClassroom,
            module_fk: idModule,
          }
        });

      if (classroom_module) {
        throw new HttpException('Turma já possui módulo', HttpStatus.NOT_FOUND);
      }

      await this.prismaService.classroom_module.create({
        data: {
          classroom: { connect: { id: idClassroom } },
          module: { connect: { id: idModule } },
          active: true
        },

      })

      return { message: 'Módulo adicionado com sucesso' };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async RemoveModule(idModule: number, idClassroom: number) {
    try {
      const classroom_module =
        await this.prismaService.classroom_module.findFirst({
          where: {
            classroom_fk: idClassroom,
            module_fk: idModule,
          }
        });

      if (!classroom_module) {
        throw new HttpException(
          'Módulo não pertence a turma',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prismaService.classroom_module.delete({
        where: {
          id: classroom_module.id
        }
      })

      return { message: 'Módulo removido com sucesso' };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

}


