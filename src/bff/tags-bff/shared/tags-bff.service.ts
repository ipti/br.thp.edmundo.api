import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/utils/jwt.interface';

@Injectable()
export class TagsBffService {
  constructor(private readonly prisma: PrismaService) { }

  async createTagUser(user: JwtPayload, idTag: number) {
    const tags = await this.prisma.tags.findUnique({
      where: { id: idTag },
    });

    if (!tags) {
      throw new HttpException('Tag Not Found', HttpStatus.BAD_REQUEST);
    }

    try {
      const tags_users = await this.prisma.tags_users.create({
        data: {
          users: { connect: { id: user.id } },
          tag: { connect: { id: idTag } },
        },
      });

      return tags_users;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async createTagActivities(idActivities: number, idTag: number) {
    const tags = await this.prisma.tags.findUnique({
      where: { id: idTag },
    });

    if (!tags) {
      throw new HttpException('Tag Not Found', HttpStatus.BAD_REQUEST);
    }

    try {
      const tags_activities = await this.prisma.tags_activities.create({
        data: {
          activities: { connect: { id: idActivities } },
          tag: { connect: { id: idTag } },
        },
      });

      return tags_activities;
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



