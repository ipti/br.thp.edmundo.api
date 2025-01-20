import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/utils/jwt.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTypeGroupDto } from '../dto/create-type_group.dto';
import { UpdateTypeGroupDto } from '../dto/update-type_group.dto';

@Injectable()
export class TypeGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(CreateTypeGroupDto: CreateTypeGroupDto) {
    try {
      const stamp = await this.prisma.type_group_avaliation.create({
        data: {
          name: CreateTypeGroupDto.name,
          value: CreateTypeGroupDto.value,
        },
      });

      return stamp;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const type_group = await this.prisma.type_group_avaliation.findMany();
      return type_group;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const type_group = await this.prisma.type_group_avaliation.findUnique({
        where: { id: +id },
      });

      if (!type_group) {
        throw new HttpException('type_group not found', HttpStatus.NOT_FOUND);
      }

      return type_group;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    user: JwtPayload,
    id: string,
    UpdateTypeGroupDto: UpdateTypeGroupDto,
  ) {
    try {
      this.findOne(id);

      const tags = await this.prisma.type_group_avaliation.update({
        where: { id: +id },
        data: { ...UpdateTypeGroupDto },
      });

      return tags;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(user: JwtPayload, id: string) {
    try {
      // verifyAdmin(user);

      await this.findOne(id);

      await this.prisma.type_group_avaliation.delete({
        where: { id: +id },
      });

      return { message: 'TypeGroup deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
