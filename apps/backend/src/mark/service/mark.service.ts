import { Injectable } from '@nestjs/common';
import { Mark } from 'core';
import { PrismaProvider } from 'src/db/prisma.provider';

@Injectable()
export class MarkService {
  constructor(private readonly prisma: PrismaProvider) {}

  async seMarksDescription(search: string): Promise<Mark | null> {
    return (await this.prisma.mark.findMany({
      where: {
        active: true,
        description: {
          contains: search,
        },
      },
      select: {
        id: true,
        description: true,
      },
      orderBy: [{ description: 'asc' }],
    })) as any;
  }

  async seMarkGetDescription(description: string): Promise<Mark | null> {
    return (await this.prisma.mark.findUnique({
      where: {
        active: true,
        description: description.toUpperCase(),
      },
      select: {
        id: true,
        description: true,
      },
    })) as any;
  }

  async seMarksAll() {
    try {
      return await this.prisma.mark.findMany({
        where: { active: true },
      });
    } catch (error) {
      console.error('Erro ao buscar o marcaa', error.message);
      throw error;
    }
  }

  async seMarkNew(mark: Mark) {
    try {
      return await this.prisma.mark.create({
        data: {
          id: mark.id,
          description: mark.description,
          createDate: mark.createDate,
          active: mark.active,
        },
      });
    } catch (error) {
      console.error('Erro ao criar marca:', error.message);
      throw error;
    }
  }

  async seMarkDelete(id: string) {
    try {
      return await this.prisma.mark.update({
        where: { id: id },
        data: {
          active: false,
        },
        select: {
          description: true,
        },
      });
    } catch (error) {
      console.error('Erro ao deletar marca:', error.message);
      throw error;
    }
  }

  async seMarkUpdate(id: string, markData: Partial<Mark>) {
    try {
      return await this.prisma.mark.update({
        where: { id: id },
        data: {
          description: markData.description.toUpperCase(),
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar marca:', error.message);
      throw error;
    }
  }
}
