import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ComplementProduct, Product } from 'core';
import { ProductService } from '../service/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('new/validate/description/:description')
  async validateDescription(@Param('description') description: string) {
    const product =
      await this.productService.seProductGetDescription(description);
    return { inUse: product };
  }

  @Get('get/')
  async coProductsDescription(@Query('search') search?: string) {
    return await this.productService.seProductsDescription();
  }

  @Get('get/id/:id')
  async coProductId(@Param('id') id: string) {
    return await this.productService.seProductId(id);
  }

  @Get('get/all')
  async coProductsAll() {
    return await this.productService.seProductsAll();
  }

  @Put('update/id/:id')
  async coProductUpdate(
    @Param('id') id: string,
    @Body()
    productData: Partial<Product>,
  ) {
    return await this.productService.seProductUpdate(id, productData);
  }

  @Put('delete/:id')
  async coProductDelete(@Param('id') id: string) {
    return await this.productService.seProductDelete(id);
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
