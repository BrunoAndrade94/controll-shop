import {
  Body,
  Controller,
  Get,
  Global,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ComplementMark, Mark } from 'core';
import { MarkService } from '../service/mark.service';

@Global()
@Controller('marks')
export class MarkController {
  constructor(private readonly markService: MarkService) {}

  @Get('new/validate/description/:description')
  async validateDescription(@Param('description') description: string) {
    const mark = await this.markService.seMarkGetDescription(description);
    return { inUse: mark };
  }

  @Get('get')
  async coMarksDescription(@Query('search') search?: string) {
    return this.markService.seMarksDescription(search);
  }

  @Get('get/all')
  async coMarksAll() {
    return this.markService.seMarksAll();
  }

  @Put('update/:id')
  async coMarkUpdate(
    @Param('id') id: string,
    @Body()
    markData: Partial<Mark>,
  ) {
    return this.markService.seMarkUpdate(id, markData);
  }

  @Put('delete/:id')
  async coMarkDelete(@Param('id') id: string) {
    return this.markService.seMarkDelete(id);
  }

  @Post('new')
  async coMarkNew(
    @Body()
    markData: {
      description: string;
    },
  ) {
    try {
      const markComplete = ComplementMark(markData);

      const newMark = await this.markService.seMarkNew(markComplete);

      return { message: 'Mark criado com sucesso', mark: newMark };
    } catch (error) {
      return { message: 'Erro ao criar mark', error };
    }
  }
}
