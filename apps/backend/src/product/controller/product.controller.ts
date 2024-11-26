import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ComplementProduct, Product } from 'core';
import { ProductService } from '../service/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('get')
  async coProductsDescription(@Query('search') search?: string) {
    return this.productService.seProductsDescription(search);
  }

  @Get('get/all')
  async coProductsAll() {
    return this.productService.seProductsAll();
  }

  @Put('update/:id')
  async coProductUpdate(
    @Param('id') id: string,
    @Body()
    productData: Partial<Product>,
  ) {
    return this.productService.seProductUpdate(id, productData);
  }

  @Put('delete/:id')
  async coProductDelete(@Param('id') id: string) {
    return this.productService.seProductDelete(id);
  }

  @Post('new')
  async coProductNew(
    @Body()
    productData: {
      description: string;
      codeBar: string;
      lastPrice: number;
      markId: string;
    },
  ) {
    try {
      const productComplete = ComplementProduct(productData);

      const newProduct =
        await this.productService.seProductNew(productComplete);

      return { message: 'Produto criado com sucesso', product: newProduct };
    } catch (error) {
      return { message: 'Erro ao criar produto', error };
    }
  }
}
