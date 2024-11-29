import { Injectable } from '@nestjs/common';
import { Local } from 'core';
import { PrismaProvider } from 'src/db/prisma.provider';

@Injectable()
export class LocalService {
  constructor(private readonly prisma: PrismaProvider) {}

  // Obter todos os locals (com busca opcional)
  async seLocalsDescription(search?: string) {
    return await this.prisma.local.findMany({
      where: search
        ? {
            active: true,
            description: {
              contains: search,
            },
          }
        : undefined,
      select: {
        description: true,
      },
    });
  }

  async seLocalsAll() {
    try {
      return await this.prisma.local.findMany({
        where: { active: true },
      });
    } catch (error) {
      console.error('Erro ao buscar o local', error.message);
      throw error;
    }
  }

  async seLocalNew(local: Local) {
    try {
      return await this.prisma.local.create({
        data: {
          id: local.id,
          description: local.description,
          createDate: local.createDate,
          active: local.active,
        },
      });
    } catch (error) {
      console.error('Erro ao criar local:', error.message);
      throw error;
    }
  }

  async seLocalDelete(id: string) {
    try {
      return await this.prisma.local.update({
        where: { id: id },
        data: {
          active: false,
        },
        select: {
          description: true,
        },
      });
    } catch (error) {
      console.error('Erro ao deletar local:', error.message);
      throw error;
    }
  }

  async seLocalUpdate(id: string, localData: Partial<Local>) {
    try {
      return await this.prisma.local.update({
        where: { id: id },
        data: {
          description: localData.description.toUpperCase(),
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar local:', error.message);
      throw error;
    }
  }
}
