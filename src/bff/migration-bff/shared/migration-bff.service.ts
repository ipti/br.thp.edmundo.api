import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Kinship } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { MigrationDto } from '../dto/migration-bff.dto';

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
  constructor(private readonly prisma: PrismaService) { }

  async migrationMeuBen(MigrationDto: MigrationDto) {
    try {
      const transactionResult = this.prisma.$transaction(async (tx) => {
        const registration = await tx.user_classroom.findMany({
          where: {
            classroomId: MigrationDto.idClassroom,
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
            birthday: registrationOne.birthday,
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

        await axios.post(process.env.BACKEND_URL + '/aviste-bff', body);

        return { message: 'Migração feita com sucesso!' };
      });

      return transactionResult;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }



}
