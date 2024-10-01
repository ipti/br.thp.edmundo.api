import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AzureProviderService } from 'src/utils/middleware/azure.provider';
import { CreateFormDto } from '../dto/create-form.dto';

@Injectable()
export class FormBffService {
  constructor(
    readonly prismaService: PrismaService,
    readonly azureService: AzureProviderService,
  ) {}

  async createForm(body: CreateFormDto) {
    try {

      const form = await this.prismaService.form.findFirst({
        where: {
          id: body.questions[0].form_fk
        }
      })

      if (!form) {
        throw new HttpException('Form not found', HttpStatus.NOT_FOUND);
      }
  

      const transactionResult = this.prismaService.$transaction(async (tx) => {
        for (const i of body.questions) {
          const question = await tx.question.create({
            data: {
              content: i.content,
              type: i.type,
              form: { connect: { id: i.form_fk } },
            },
          });

          for (const op of i.options) {
            const option = await tx.options.create({
              data: {
                content: op.content,
                question: { connect: { id: question.id } },
              },
            });

            if (op.isResponse) {
              await tx.response_question.create({
                data: {
                  options: { connect: { id: option.id } },
                  question: { connect: { id: question.id } },
                },
              });
            }
          }

          return { message: 'Atividade adicionada com sucesso' };
        }
      });

      return transactionResult;
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
