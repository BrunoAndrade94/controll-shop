import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { PrismaService } from 'src/db/prisma.service';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';

@Module({
  imports: [DbModule],
  providers: [ProductService, PrismaService],
  controllers: [ProductController],
})
export class ProductModule {}
