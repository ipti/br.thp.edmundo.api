import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Kinship } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  MigrationDto,
  MigrationMeubenToCodedDto,
} from '../dto/migration-bff.dto';
import { JwtPayload } from 'src/utils/jwt.interface';
import { UsersService } from 'src/users/shared/users.service';

export interface RegistrationDto {
  name: string;
  birthday: string;
  cpf?: string;
  sex?: number;
  color_race?: number;
  deficiency: boolean;
  zone?: number;
  deficiency_description?: string;
  responsable_name?: string;
  responsable_cpf?: string;
  responsable_telephone?: string;
  kinship?: Kinship;
}

@Injectable()
export class MigrationBffService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userServices: UsersService,
  ) {}

  async migrationMeuBen(MigrationDto: MigrationDto) {
    try {
      const transactionResult = this.prisma.$transaction(async (tx) => {
        const registration = await tx.user_classroom.findMany({
          where: {
            classroomId: MigrationDto.idClassroom,
            users: {
              role: 'STUDENT',
            },
          },
          select: {
            users: {
              select: {
                name: true,
                registration: true,
              },
            },
          },
        });

        const body: any = registration.map((item) => {
          const registrationOne = item.users.registration[0];
          return {
            name: item.users.name,
            cpf: registrationOne.cpf,
            birthday: registrationOne.birthday.toISOString().split('T')[0],
            sex: registrationOne.sex,
            color_race: registrationOne.color_race,
            deficiency: registrationOne.deficiency,
            avatar_url: registrationOne.avatar_url,
            zone: registrationOne.zone,
            kinship: registrationOne.kinship,
            deficiency_description: registrationOne.deficiency_description,
            responsable_name: registrationOne.responsable_name,
            responsable_cpf: registrationOne.responsable_cpf,
            responsable_telephone: registrationOne.responsable_telephone,
          };
        });

        await axios
          .post(
            process.env.BACKEND_URL +
              '/migration-bff?token=' +
              process.env.TOKEN,
            {
              project: MigrationDto.project,
              year: MigrationDto.year,
              name: MigrationDto.name,
              registration: body,
            },
          )
          .catch((erro) => {
            console.log(erro);
          });

        return { message: 'Migração feita com sucesso!' };
      });

      return transactionResult;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async migrationMeuBentocoded(
    MigrationDto: MigrationMeubenToCodedDto,
    user: JwtPayload,
  ) {
    try {
      const transactionResult = this.prisma.$transaction(async (tx) => {
        const classroomOne = await this.findClassroomOne(
          MigrationDto.idClassroom.toString(),
        );
        const classroom = await tx.classroom.create({
          data: {
            name: classroomOne.name,
            owner_user_fk: user.id,
            reapplication: { connect: { id: MigrationDto.idReaplication } },
          },
        });

        function convertData(date: Date) {
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
          const year = date.getFullYear();

          return `${day}${month}${year}`;
        }

        function parseDate(dateString) {
          const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
          const match = dateString.match(regex);

          if (!match) return new Date(dateString); // Retorna null se o formato estiver errado

          let [, day, month, year] = match;
          day = parseInt(day, 10);
          month = parseInt(month, 10);
          year = parseInt(year, 10);

          // Ajustar mês inválido (se for maior que 12, coloca no máximo 12)
          if (month > 12) month = 12;

          // Ajustar o dia para que seja válido no mês ajustado
          const lastDayOfMonth = new Date(year, month, 0).getDate(); // Último dia do mês
          if (day > lastDayOfMonth) day = lastDayOfMonth;

          // Garantir que o ano esteja dentro de um intervalo aceitável (exemplo: 1900-2100)
          if (year < 1900) year = 1900;
          if (year > 2100) year = 2100;

          // Criar e retornar a nova data
          return new Date(year, month - 1, day); // Retorna null se o formato não for válido
        }

        function getFirstName(fullName) {
          return fullName
            .trim()
            .split(' ')[0]
            .toLowerCase()
            .normalize('NFD') // Separa os acentos dos caracteres
            .replace(/[\u0300-\u036f]/g, '');
        }

        for (const register_classroom of classroomOne.register_classroom) {
          var registration = register_classroom.registration;
          const regi = await tx.registration.findFirst({
            where: {
              cpf: {
                not: '',
                equals: registration.cpf,
              },
            },
            include: {
              user: true,
            },
          });

          if (!regi) {
            const hashedPassword = await this.userServices.hashPassword(
              convertData(parseDate(registration.birthday)).toString(),
            );

            const user = await tx.users.create({
              data: {
                name: registration.name,
                email:
                  getFirstName(registration.name) +
                  '#' +
                  convertData(parseDate(registration.birthday)).toString(),
                password: hashedPassword,
                role: 'STUDENT',
              },
            });

            await tx.registration.create({
              data: {
                birthday: parseDate(registration.birthday),
                color_race: registration.color_race,
                deficiency: registration.deficiency,
                sex: registration.sex,
                zone: registration.zone,
                cpf: registration.cpf,
                responsable_name: registration.responsable_name,
                responsable_telephone: registration.responsable_telephone,
                kinship: registration.kinship,
                responsable_cpf: registration.responsable_cpf,
                user: { connect: { id: user.id } },
              },
            });

            await tx.user_classroom.create({
              data: {
                classroom: {
                  connect: {
                    id: classroom.id,
                  },
                },
                users: {
                  connect: {
                    id: user.id,
                  },
                },
              },
            });
          } else {
            await tx.user_classroom.create({
              data: {
                classroom: {
                  connect: {
                    id: classroom.id,
                  },
                },
                users: {
                  connect: {
                    id: regi.user.id,
                  },
                },
              },
            });
          }
        }

        return { message: 'Migração feita com sucesso!' };
      });

      return transactionResult;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findTsAll() {
    try {
      const ts = await axios.get(
        process.env.BACKEND_URL + '/migration-bff?token=' + process.env.TOKEN,
      );
      return ts.data;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findClassroomList(id: string) {
    try {
      const classroomList = await axios.get(
        process.env.BACKEND_URL +
          '/migration-bff/classroom-list?token=' +
          process.env.TOKEN +
          '&idProject=' +
          id,
      );
      return classroomList.data;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findClassroomOne(id: string) {
    try {
      const classroomOne = await axios.get(
        process.env.BACKEND_URL +
          '/migration-bff/classroom-one?token=' +
          process.env.TOKEN +
          '&idClassroom=' +
          id,
      );
      return classroomOne.data;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
