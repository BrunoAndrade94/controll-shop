import {
  Global,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class PrismaProvider
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // client = new PrismaClient(); // A instância do Prisma Client que será injetada nos serviços

  // constructor() {
  //   super();
  //   this.client.$connect(); // Conecta ao banco de dados quando a aplicação inicializar
  // }
  onModuleInit() {
    this.$connect();
  }

  onModuleDestroy() {
    this.$disconnect();
  }
}
