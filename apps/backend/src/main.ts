import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({});

  // Habilita o ValidationPipe globalmente
  // app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT ?? 3033;
  const host = process.env.HOST ?? '0.0.0.0';

  await app.listen(port);
}
bootstrap();
