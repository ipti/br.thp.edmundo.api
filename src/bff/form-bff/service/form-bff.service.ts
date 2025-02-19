import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AzureProviderService } from 'src/utils/middleware/azure.provider';
import { CreateFormDto } from '../dto/create-form.dto';
import { CreateResponseDto } from '../dto/create-response.dto';
import { JwtPayload } from 'src/utils/jwt.interface';
import { UpdateQuestionDto } from '../dto/update-question.dto';

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
          id: body.questions[0].form_fk,
        },
      });

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
        }
        return { message: 'Atividade adicionada com sucesso' };
      });

      return transactionResult;
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createResponse(body: CreateResponseDto, user: JwtPayload) {
    try {
      const transactionResult = this.prismaService.$transaction(async (tx) => {
        const answer_form = await tx.answer_form.create({
          data: {
            form: { connect: { id: body.form_fk } },
            users: { connect: { id: user.id } },
            classroom: { connect: { id: body.classroom_fk } },
          },
        });

        for (const question of body.question) {
          const answer_question = await tx.answer_question.create({
            data: {
              question: { connect: { id: question.question_fk } },
              answer_form: { connect: { id: answer_form.id } },
            },
          });

          for (const option of question.options) {
            await tx.answer_option.create({
              data: {
                options: { connect: { id: option.options_fk } },
                answer_question: { connect: { id: answer_question.id } },
              },
            });
          }
        }

        await tx.user_activities.update({
          where: {
            id: body.user_activities_id,
          },
          data: {
            status: 'COMPLETED',
          },
        });

        return { message: 'Resposta enviada' };
      });

      return transactionResult;
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateQuestion(body: UpdateQuestionDto) {
    try {
      const transactionResult = this.prismaService.$transaction(async (tx) => {
        const question = await tx.question.findUnique({
          where: {
            id: body.id,
          },
        });

        if (question) {
          await tx.question.update({
            where: {
              id: body.id,
            },
            data: {
              content: body.content,
            },
          });
        }

        for (const option of body.options) {
          const op = await tx.options.findUnique({
            where: { id: option.id },
          });

          if (op) {
            await tx.options.update({
              where: { id: option.id },
              data: { content: option.content },
            });
          }
        }

        return { message: 'Questão alterada com sucesso' };
      });

      return transactionResult;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
