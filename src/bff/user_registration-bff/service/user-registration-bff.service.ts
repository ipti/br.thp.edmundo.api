import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordUserDto } from '../dto/password-user-registration.dto';
import { UpdateUserRegistrationDto } from '../dto/update-user-registration.dto';
import { CreateUserRegistrationDto } from '../dto/create-users-registration.dto';
import { AzureProviderService } from 'src/utils/middleware/azure.provider';

@Injectable()
export class UserRegistrationBffService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly azureService: AzureProviderService,
  ) { }

  async encryptedPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async create(createUserDto: CreateUserRegistrationDto) {
    const userRegistered = await this.prismaService.users.findMany({
      where: { email: createUserDto.email },
    });

    if (userRegistered.length > 0) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await this.hashPassword(createUserDto.password);

    try {
      const createdUser = await this.prismaService.users.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          role: createUserDto.role,
          password: hashedPassword,
        },
      });


      await this.prismaService.registration.create({
        data: {
          birthday: createUserDto.birthday,
          color_race: createUserDto.color_race,
          sex: createUserDto.sex,
          cpf: createUserDto.cpf,
          deficiency: createUserDto.deficiency,
          responsable_telephone: createUserDto.responsable_telephone,
          responsable_name: createUserDto.responsable_name,
          responsable_cpf: createUserDto.responsable_cpf,
          zone: createUserDto.zone,
          kinship: createUserDto.kinship,
          user: { connect: { id: createdUser.id } },

        }
      })
      return createdUser;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateAvatar(id: string, file: any) {
    try {
      const registrationObject = {};

      const registration = await this.prismaService.registration.findFirst({
        where: { user_fk: +id },
      });
      if (file) {

        if (registration.avatar_url !== null) {
          await this.azureService.deleteFileByUrl(registration.avatar_url);
        }

        const fileAzure = await this.azureService.uploadFile(
          file,
          'avatar-registration',
        );

        registrationObject['avatar_url'] = fileAzure;
      }


      await this.prismaService.registration.update({
        where: { id: registration.id },
        data: registrationObject,
      });

      return { message: 'avatar alterado com sucesso' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(CreateUserDto: UpdateUserRegistrationDto, id: string) {
    const userRegistered = await this.prismaService.users.findMany({
      where: { email: CreateUserDto.email },
    });

    const userR = await this.prismaService.users.findUnique({
      where: { id: +id },
    });



    if (userRegistered.length > 0 && CreateUserDto.email !== userR.email) {
      throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
    }

    try {


      const transactionResult = this.prismaService.$transaction(async (tx) => {
        await tx.users.update({
          where: { id: +id },
          data: {
            name: CreateUserDto.name,
            email: CreateUserDto.email,
          },
        });

        const register = await tx.registration.findFirst({
          where: {
            user_fk: +id
          }
        })


        if (register) {
          await tx.registration.update({
            where: { id: register.id },
            data: {
              birthday: CreateUserDto.birthday,
              responsable_telephone: CreateUserDto.responsable_telephone,
            }
          })
        }

        return { message: 'Perfil atualizado com sucesso!' };
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
      throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
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

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
