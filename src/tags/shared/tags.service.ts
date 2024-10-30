import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/utils/jwt.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTagsDto } from '../dto/create-tags.dto';
import { UpdateTagsDto } from '../dto/update-tags.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: JwtPayload, CreateTagsDto: CreateTagsDto) {
    const tags = await this.prisma.tags.findMany({
      where: { content: CreateTagsDto.content },
    });

    if (tags.length > 0) {
      throw new HttpException('Name already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const tags = await this.prisma.tags.create({
        data: {
          content: CreateTagsDto.content,
          type: CreateTagsDto.type
        },
      });

      return tags;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const tags = await this.prisma.tags.findMany();
      return tags;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const tags = await this.prisma.tags.findUnique({
        where: { id: +id },
      });

      if (!tags) {
        throw new HttpException('Tags not found', HttpStatus.NOT_FOUND);
      }

      return tags;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(user: JwtPayload, id: string, UpdateTagsDto: UpdateTagsDto) {
    try {
      this.findOne(id);

      const tags = await this.prisma.tags.update({
        where: { id: +id },
        data: { ...UpdateTagsDto },
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

      const activities = await this.prisma.activities.findMany({
        where: {
          tags_activities: {
            some: {
              activities_fk: +id
            }
          }
        },
      });

      if (activities.length > 0) {
        throw new HttpException(
          'Não foi possivel exclui replicação por ter turmas vinculadas!',
          HttpStatus.NOT_FOUND,
        );
      }

      const users = await this.prisma.users.findMany({
        where: {
          tags_users: {
            some: {
              user_fk: +id
            }
          }
        },
      });

      if (users.length > 0) {
        throw new HttpException(
          'Não foi possivel exclui replicação por ter turmas vinculadas!',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.tags.delete({
        where: { id: +id },
      });

      return { message: 'Tags deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
