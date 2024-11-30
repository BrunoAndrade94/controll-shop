import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ComplementLocal, Local } from 'core';
import { LocalService } from '../service/local.service';

@Controller('locals')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Get('get')
  async coLocalsDescription(@Query('search') search: string) {
    return this.localService.seLocalsDescription(search);
  }

  @Get('get/all')
  async coLocalsAll() {
    return this.localService.seLocalsAll();
  }

  @Get('new/validate/description/:description')
  async validateDescription(@Param('description') description: string) {
    const local = await this.localService.seLocalGetDescription(description);
    return { inUse: !!local };
  }

  @Put('update/:id')
  async coLocalUpdate(
    @Param('id') id: string,
    @Body()
    localData: Partial<Local>,
  ) {
    const localComplete = ComplementLocal(localData);

    return await this.localService.seLocalUpdate(id, localComplete);
  }

  @Put('delete/:id')
  async coLocalDelete(@Param('id') id: string) {
    try {
      return await this.localService.seLocalDelete(id);
    } catch (error) {
      return { message: 'Erro ao deletar local', error };
    }
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

      return { message: 'Local criado com sucesso', local: newLocal };
    } catch (error) {
      return { message: 'Erro ao criar local', error };
    }
  }
}
