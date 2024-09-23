import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';
import * as bodyParser from 'body-parser';

declare const module: any;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: async (
      requestOrigin: string,
      next: (err: Error | null, origin?: string[]) => void,
    ) => {
      const origins = await app.get(AppService).getOrigins();
      next(null, origins);
    },
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  const options = new DocumentBuilder()
    .setTitle('Tecnologia Edmundo')
    .setDescription(
      'API do sistema Edmundo desenvolvido pelo THP.',
    )
    .setVersion(process.env.npm_package_version)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(process.env.APP_PORT || 3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
