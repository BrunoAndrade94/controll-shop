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
import { ComplementLocal, Local } from 'core';
import { LocalService } from '../service/local.service';

@Global()
@Controller('locals')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Get('get')
  async coLocalsDescription(@Query('search') search?: string) {
    return this.localService.seLocalsDescription(search);
  }

  @Get('get/all')
  async coLocalsAll() {
    return this.localService.seLocalsAll();
  }

  @Put('update/:id')
  async coLocalUpdate(
    @Param('id') id: string,
    @Body()
    localData: Partial<Local>,
  ) {
    return this.localService.seLocalUpdate(id, localData);
  }

  @Put('delete/:id')
  async coLocalDelete(@Param('id') id: string) {
    return this.localService.seLocalDelete(id);
  }

  @Post('new')
  async coLocalNew(
    @Body()
    localData: {
      description: string;
    },
  ) {
    try {
      const localComplete = ComplementLocal(localData);

      const newLocal = await this.localService.seLocalNew(localComplete);

      return { message: 'Local criado com sucesso', product: newLocal };
    } catch (error) {
      return { message: 'Erro ao criar local', error };
    }
  }
}
