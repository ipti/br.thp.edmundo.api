import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/utils/jwt.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGroupDTO } from '../dto/create-group_avaliation.dto';
import { UpdateTagsDto } from '../dto/update-group_avaliation.dto';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: JwtPayload, CreateGroupDTO: CreateGroupDTO) {
    const group = await this.prisma.group_avaliation.findMany({
      where: { name: CreateGroupDTO.name },
    });

    if (group.length > 0) {
      throw new HttpException('Name already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const group = await this.prisma.group_avaliation.create({
        data: {
          name: CreateGroupDTO.name,
          type_group_avaliation: {
            connect: { id: CreateGroupDTO.idTypeGroup },
          },
        },
      });

      return group;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const group = await this.prisma.group_avaliation.findMany({
        include: {
          metric_group_avaliation: true,
        },
      });
      return group;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const group = await this.prisma.group_avaliation.findUnique({
        where: { id: +id },
        include: {
          metric_group_avaliation: true,
        },
      });

      if (!group) {
        throw new HttpException('group not found', HttpStatus.NOT_FOUND);
      }

      return group;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(user: JwtPayload, id: string, UpdateTagsDto: UpdateTagsDto) {
    try {
      this.findOne(id);

      const group = await this.prisma.group_avaliation.update({
        where: { id: +id },
        data: { name: UpdateTagsDto.name },
      });

      return group;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(user: JwtPayload, id: string) {
    try {
      // verifyAdmin(user);

      await this.findOne(id);

      await this.prisma.group_avaliation.delete({
        where: { id: +id },
      });

      return { message: 'Group deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
