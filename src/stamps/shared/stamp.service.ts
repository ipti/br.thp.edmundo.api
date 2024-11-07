import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/utils/jwt.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStrampsDto } from '../dto/create-stamp.dto';
import { UpdateStampDto } from '../dto/update-stamp.dto';
import { AzureProviderService } from 'src/utils/middleware/azure.provider';

@Injectable()
export class StampsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly azureService: AzureProviderService,
  ) { }

  async create(CreateStrampsDto: CreateStrampsDto, file: any) {
    const stamps = await this.prisma.stamps.findMany({
      where: { name: CreateStrampsDto.name },
    });

    if (stamps.length > 0) {
      throw new HttpException('Name already exists', HttpStatus.BAD_REQUEST);
    }

    let img_link;

    try {
      if (file) {
        const fileAzure = await this.azureService.uploadFile(file, 'stamps');

        img_link = fileAzure;
      }

      const stamp = await this.prisma.stamps.create({
        data: {
          name: CreateStrampsDto.name,
          img_url: img_link
        },
      });

      return stamp;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const stamps = await this.prisma.stamps.findMany();
      return stamps;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const stamps = await this.prisma.stamps.findUnique({
        where: { id: +id },
      });

      if (!stamps) {
        throw new HttpException('stamps not found', HttpStatus.NOT_FOUND);
      }

      return stamps;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(user: JwtPayload, id: string, UpdateStampDto: UpdateStampDto) {
    try {
      this.findOne(id);

      const tags = await this.prisma.stamps.update({
        where: { id: +id },
        data: { ...UpdateStampDto },
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

      const stamps_user = await this.prisma.stamps.findMany({
        where: {
          stamps_user: {
            some: {
              stamps_fk: +id,
            },
          },
        },
      });

      if (stamps_user.length > 0) {
        throw new HttpException(
          'Não foi possivel exclui replicação por ter usuários vinculadas!',
          HttpStatus.NOT_FOUND,
        );
      }


      await this.prisma.stamps.delete({
        where: { id: +id },
      });

      return { message: 'Tags deleted successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
