import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReapplicationnBffService {
  constructor(private readonly prismaService: PrismaService) { }





  async findReapplicationUser(id: number) {
    try {
      const reaplication = await this.prismaService.reapplication.findMany({
        where: {
          user_reapplication: {
            some: { user_fk: id }
          }
        },
        include: {
          _count: {
            select: {
              classrooms: true
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