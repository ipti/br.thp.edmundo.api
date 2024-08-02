import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassroomBffService {
  constructor(private readonly prismaService: PrismaService) { }





  async findClassroomReapplication(idUser: number, idReapplication: number) {
    try {
      const reaplication = await this.prismaService.classroom.findMany({
        where: {
          reapplication_fk: idReapplication,
          user: {
            some: { id: +idUser }
          }
        },

        include: {
          _count: {
            select: {
              user: true
            }
          }
        }
      });

      if (!reaplication) {
        throw new HttpException('reaplication not found', HttpStatus.NOT_FOUND);
      }

      return reaplication;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }


  }
}