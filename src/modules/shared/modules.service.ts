import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/utils/jwt.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateModulesDto } from '../dto/create-modules.dto';
import { UpdateModulesDto } from '../dto/update-modules.dto';
import { verifyAdmin } from 'src/utils/verifyFunc';

@Injectable()
export class ModulesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(user: JwtPayload, CreateModulesDto: CreateModulesDto) {


    try {
      const createdmodule = await this.prisma.module.create({
        data: {
          name: CreateModulesDto.name,
          description: CreateModulesDto.description
        },
      });

      return createdmodule;
    } catch (err) {

      console.log(err)
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const modules = await this.prisma.module.findMany();
      return modules;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const reaplication = await this.prisma.module.findUnique({
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
    UpdateModulesDto: UpdateModulesDto,
  ) {
    try {

      this.findOne(id);

      const updatedreaplication = await this.prisma.module.update({
        where: { id: +id },
        data: { ...UpdateModulesDto },
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

      const module_classroom = await this.prisma.classroom_module.findMany({
        where: {
          module_fk: +id
        }
      })

      if (module_classroom.length > 0) {
        throw new HttpException(
          'Não foi possivel exclui modulo por ter turmas vinculadas a ele',
          HttpStatus.NOT_FOUND,
        );
      }


      const classes = await this.prisma.classes.findMany({
        where: {
          moduleId: +id
        }
      })

      if (classes.length > 0) {
        for (const i of classes) {
          await this.prisma.classes.delete({
            where: {
              id: i.id
            }
          })
        }
      }

      await this.prisma.module.delete({
        where: { id: +id },
      });

      return { message: 'reaplication deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
