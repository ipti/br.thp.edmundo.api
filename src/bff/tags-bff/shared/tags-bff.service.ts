import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/utils/jwt.interface';
import {
  CreateActivitiesTagsDto,
  CreateUserTagsDto,
} from '../dto/create-tags-bff.dto';

@Injectable()
export class TagsBffService {
  constructor(private readonly prisma: PrismaService) {}

  async createTagUser(CreateUserTagsDto: CreateUserTagsDto, user: JwtPayload) {
    try {
      console.log(CreateUserTagsDto.items)
      const transactionResult = this.prisma.$transaction(async (tx) => {
        await tx.tags_users.deleteMany({
          where: {
            user_fk: user.id,
          },
        });

        for (const userTag of CreateUserTagsDto.items) {
          const tags = await tx.tags.findUnique({
            where: { id: userTag.idTag },
          });

          if (!tags) {
            throw new HttpException('Tag Not Found', HttpStatus.BAD_REQUEST);
          }

          await tx.tags_users.create({
            data: {
              users: { connect: { id: user.id } },
              tag: { connect: { id: userTag.idTag } },
            },
          });
        }
        return { message: 'Adicionados com sucesso!' };
      });

      return transactionResult;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async createTagActivities(CreateActivitiesTagsDto: CreateActivitiesTagsDto) {
    try {
      const transactionResult = this.prisma.$transaction(async (tx) => {
        await tx.tags_activities.deleteMany({
          where: {
            activities_fk: CreateActivitiesTagsDto.idActivitie,
          },
        });

        for (const userTag of CreateActivitiesTagsDto.items) {
          const tags = await tx.tags.findUnique({
            where: { id: userTag.idTag },
          });

          if (!tags) {
            throw new HttpException('Tag Not Found', HttpStatus.BAD_REQUEST);
          }

          await tx.tags_activities.create({
            data: {
              activities: {
                connect: { id: CreateActivitiesTagsDto.idActivitie },
              },
              tag: { connect: { id: userTag.idTag } },
            },
          });
        }
        return { message: 'Adicionados com sucesso!' };
      });

      return transactionResult;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllUser() {
    try {
      const tags = await this.prisma.tags.findMany({
        where: {
          type: 'USERS',
        },
      });
      return tags;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllActivities() {
    try {
      const tags = await this.prisma.tags.findMany({
        where: {
          type: 'ACTIVITIES',
        },
      });
      return tags;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async removeTagUser(id: string) {
    try {
      const tags_users = await this.prisma.tags_users.findUnique({
        where: {
          id: +id,
        },
      });

      if (!tags_users) {
        throw new HttpException(
          'Não foi possivel exclui replicação por ter turmas vinculadas!',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.tags_users.delete({
        where: { id: +id },
      });

      return { message: 'Tags User deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async removeTagActivities(id: string) {
    try {
      const tags_users = await this.prisma.tags_users.findUnique({
        where: {
          id: +id,
        },
      });

      if (!tags_users) {
        throw new HttpException(
          'Não foi possivel exclui replicação por ter turmas vinculadas!',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.tags_users.delete({
        where: { id: +id },
      });

      return { message: 'Tags User deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
