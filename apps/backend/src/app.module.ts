import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { PrismaProvider } from './db/prisma.provider';
import { LocalModule } from './local/local.module';
import { MarkModule } from './mark/mark.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [DbModule, ProductModule, LocalModule, MarkModule],
  controllers: [AppController],
  providers: [AppService, PrismaProvider],
})
export class AppModule {}
