import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { PrismaService } from 'src/db/prisma.service';
import { BuyService } from './buy.service';
import { BuysController } from './buys.controller';

@Module({
  imports: [DbModule],
  controllers: [BuysController],
  providers: [BuyService, PrismaService],
})
export class BuysModule {}
