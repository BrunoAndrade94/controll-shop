import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BuyService } from './buy.service';

@Controller('buys')
export class BuysController {
  constructor(readonly repository: BuyService) {}

  @Get('get/all')
  async coGetBuys() {
    try {
      const buys = await this.repository.prGetAllBuys();
      return { buys };
    } catch (error) {
      return { message: 'Erro ao buscar produtos', error };
    }
  }

  @Get('/products/get/all')
  async coGetBuyProducts() {
    try {
      const buys = await this.repository.prGetBuyProducts();
      return { buys };
    } catch (error) {
      return { message: 'Erro ao buscar produtos', error };
    }
  }

  @Get('get/:id')
  async coGetIdProduct(@Param('id') id: string) {
    try {
      const buy = await this.repository.prGetIdBuy(id);
      if (!buy) {
        return { message: 'Produto não encontrado' };
      }
      return { buy };
    } catch (error) {
      return { message: 'Erro ao buscar produto', error };
    }
  }

  @Post('new')
  async coNewBuy(
    @Body()
    body: {
      localId: string;
      products: { productId: string; amount: number; unitPrice: number }[];
    },
  ) {
    try {
      const { localId, products } = body;

      if (!Array.isArray(products) || products.length === 0) {
        throw new Error(
          'Você precisa incluir ao menos um produto para realizar a compra.',
        );
      }

      const newBuy = await this.repository.prNewBuy({
        localId,
        products,
      });

      return {
        message: 'Compra criada com sucesso!',
        data: newBuy,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Erro ao criar a compra.',
        error: error.message,
      };
    }
  }
}
