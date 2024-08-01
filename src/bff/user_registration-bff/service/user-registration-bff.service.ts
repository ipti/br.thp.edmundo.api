import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordUserDto } from '../dto/password-user-registration.dto';
import { UpdateUserDto } from '../dto/update-user-registration.dto';

@Injectable()
export class UserBffService {
  constructor(private readonly prismaService: PrismaService) { }

  async encryptedPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }


  async updateUser(CreateUserDto: UpdateUserDto, id: string) {
    const userRegistered = await this.prismaService.users.findMany({
      where: { email: CreateUserDto.username },
    });

    const userR = await this.prismaService.users.findUnique({
      where: { id: +id },
    });



    if (userRegistered.length > 0 && CreateUserDto.username !== userR.email) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const transactionResult = this.prismaService.$transaction(async (tx) => {
        const user = await tx.users.update({
          where: { id: +id },
          data: {
            name: CreateUserDto.name,
            email: CreateUserDto.username,
          },
        });

        const register = await tx.registration.findFirst({
          where: {
            user_fk: +id
          }
        })

        if(register > 0){
          await tx.registration.update({
            data: {
              birthday: CreateUserDto.birthday,
              color_race: CreateUserDto.color_race,
              
            }
          })
        }

        return { message: 'User created successfully' };
      });
      return transactionResult;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async changePassword(
    id: number,
    newPassword: ChangePasswordUserDto,
    req: any,
  ) {
    const userReq = await this.prismaService.users.findUnique({
      where: { id: +req },
    });

    if (userReq.role !== 'ADMIN') {
      throw new HttpException(
        'Usuário não tem permissão',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.prismaService.users.findUnique({
      where: { id: +id },
    });

    if (!user) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const password = await this.encryptedPassword(newPassword.password);
      await this.prismaService.users.update({
        where: { id: id },
        data: {
          password: password,
        },
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    const user = await this.prismaService.users.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        password: false,
        role: true,
        registration: {
          where: { user_fk: id }
        },
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
