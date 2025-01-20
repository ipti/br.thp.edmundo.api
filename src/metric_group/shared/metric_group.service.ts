import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/utils/jwt.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMetricGroupDTO } from '../dto/create-group.dto';
import { UpdateMetricGroupDto } from '../dto/update-group.dto';

@Injectable()
export class MetricGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: JwtPayload, CreateMetricGroupDTO: CreateMetricGroupDTO) {
    try {
      const metric_group = await this.prisma.metric_group.create({
        data: {
          description: CreateMetricGroupDTO.description,
          metric_percentange: CreateMetricGroupDTO.metric_percentange,
          group: { connect: { id: CreateMetricGroupDTO.idGroup } },
        },
      });

      return metric_group;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const metric_group = await this.prisma.metric_group.findMany();
      return metric_group;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const metric_group = await this.prisma.metric_group.findUnique({
        where: { id: +id },
      });

      if (!metric_group) {
        throw new HttpException('metric_group not found', HttpStatus.NOT_FOUND);
      }

      return metric_group;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    user: JwtPayload,
    id: string,
    UpdateMetricGroupDto: UpdateMetricGroupDto,
  ) {
    try {
      this.findOne(id);

      const metric_group = await this.prisma.metric_group.update({
        where: { id: +id },
        data: { ...UpdateMetricGroupDto },
      });

      return metric_group;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(user: JwtPayload, id: string) {
    try {
      // verifyAdmin(user);

      await this.findOne(id);

      await this.prisma.metric_group.delete({
        where: { id: +id },
      });

      return { message: 'Group deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
