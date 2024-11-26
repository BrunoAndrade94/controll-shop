import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { PrismaService } from 'src/db/prisma.service';
import { LocalController } from './controller/local.controller';
import { LocalService } from './service/local.service';

@Module({
  imports: [DbModule],
  providers: [LocalService, PrismaService],
  controllers: [LocalController],
})
export class LocalModule {}
