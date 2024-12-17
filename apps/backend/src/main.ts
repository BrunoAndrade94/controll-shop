import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ErrorFilter from './error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new ErrorFilter());

  // Habilita o ValidationPipe globalmente
  // app.useGlobalPipes(new ValidationPipe());
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const cors = require('cors');

  app.use(
    cors({
      origin: 'https://controle-de-compras.netlify.app/',
    }),
  ); // URL do frontend

  const port = process.env.PORT ?? 4000;
  const host = process.env.HOST ?? '0.0.0.0';

  await app.listen(port, host);
}
bootstrap();
