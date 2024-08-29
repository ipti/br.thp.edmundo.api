import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

}