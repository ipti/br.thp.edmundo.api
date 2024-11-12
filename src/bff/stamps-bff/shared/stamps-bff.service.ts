import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateStampsDto,
  CreateUserStampsDto,
} from '../dto/create-stamps-bff.dto';

@Injectable()
export class StampsBffService {
  constructor(private readonly prisma: PrismaService) {}

  async createStampUser(CreateUserStampsDto: CreateUserStampsDto) {
    try {
      const transactionResult = this.prisma.$transaction(async (tx) => {
        await tx.stamps_user.create({
          data: {
            stamps: {
              connect: {
                id: CreateUserStampsDto.idStamp,
              },
            },
            users: {
              connect: {
                id: CreateUserStampsDto.idUser,
              },
            },
          },
        });

        return { message: 'Adicionados com sucesso!' };
      });

      return transactionResult;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async createUsersStamp(CreateStampsDto: CreateStampsDto) {
    try {
      const transactionResult = this.prisma.$transaction(async (tx) => {
        const stamps = await tx.stamps.findFirst({
          where: {
            id: CreateStampsDto.idStamps,
          },
        });

        if (!stamps) {
          throw new HttpException('Stamp Not Found', HttpStatus.BAD_REQUEST);
        }

        for (const userStamp of CreateStampsDto.items) {
          const stamps_user = await tx.stamps_user.findFirst({
            where: {
              user_fk: userStamp.idUser,
              stamps_fk: CreateStampsDto.idStamps,
            },
          });

          if (!stamps_user) {
            await tx.stamps_user.create({
              data: {
                stamps: {
                  connect: {
                    id: CreateStampsDto.idStamps,
                  },
                },
                users: {
                  connect: {
                    id: userStamp.idUser,
                  },
                },
              },
            });
          }
        }
        return { message: 'Adicionados com sucesso!' };
      });

      return transactionResult;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  // async findAllUser() {
  //   try {
  //     const tags = await this.prisma.tags.findMany({
  //       where: {
  //         type: 'USERS',
  //       },
  //     });
  //     return tags;
  //   } catch (err) {
  //     throw new HttpException(err, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // async findAllActivities() {
  //   try {
  //     const tags = await this.prisma.tags.findMany({
  //       where: {
  //         type: 'ACTIVITIES',
  //       },
  //     });
  //     return tags;
  //   } catch (err) {
  //     throw new HttpException(err, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // async removeTagUser(id: string) {
  //   try {
  //     const tags_users = await this.prisma.tags_users.findUnique({
  //       where: {
  //         id: +id,
  //       },
  //     });

  //     if (!tags_users) {
  //       throw new HttpException(
  //         'Não foi possivel exclui replicação por ter turmas vinculadas!',
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }

  //     await this.prisma.tags_users.delete({
  //       where: { id: +id },
  //     });

  //     return { message: 'Tags User deleted successfully' };
  //   } catch (err) {
  //     throw new HttpException(err, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // async removeTagActivities(id: string) {
  //   try {
  //     const tags_users = await this.prisma.tags_users.findUnique({
  //       where: {
  //         id: +id,
  //       },
  //     });

  //     if (!tags_users) {
  //       throw new HttpException(
  //         'Não foi possivel exclui replicação por ter turmas vinculadas!',
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }

  //     await this.prisma.tags_users.delete({
  //       where: { id: +id },
  //     });

  //     return { message: 'Tags User deleted successfully' };
  //   } catch (err) {
  //     throw new HttpException(err, HttpStatus.BAD_REQUEST);
  //   }
  // }
}
