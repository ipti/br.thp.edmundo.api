import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Kinship } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  MigrationDto,
  MigrationMeubenToCodedDto,
} from '../dto/migration-bff.dto';
import { JwtPayload } from 'src/utils/jwt.interface';

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
  constructor(private readonly prisma: PrismaService) {}

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
        const classroom = await tx.classroom.create({
          data: {
            name: MigrationDto.name,
            // user: { connect: { id: user.id } },
            owner_user_fk: user.id,
          },
        });

        for (const registration of MigrationDto.registration) {
          const regi = await tx.registration.findFirst({
            where: {
              cpf: registration.cpf,
            },
          });

          if (!regi) {
            const user = await tx.users.create({
              data: {
                name: registration.name,
                email: registration.email,
                password: this.convertData(registration.birthday).toString(),
                role: 'STUDENT',
              },
            });

            await tx.registration.create({
              data: {
                birthday: registration.birthday,
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
      const stamps = await axios.get(
        process.env.BACKEND_URL + '/migration-bff?token=' + process.env.TOKEN,
      );
      return stamps.data;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async convertData(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const year = date.getFullYear();

    return `${day}${month}${year}`;
  }
}
