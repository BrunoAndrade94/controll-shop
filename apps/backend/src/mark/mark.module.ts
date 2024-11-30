import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { PrismaService } from 'src/db/prisma.service';
import { MarkController } from './controller/mark.controller';
import { MarkService } from './service/mark.service';

@Module({
  imports: [DbModule],
  providers: [MarkService, PrismaService],
  controllers: [MarkController],
})
export class MarkModule {}
