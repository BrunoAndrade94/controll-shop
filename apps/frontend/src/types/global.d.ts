declare global {
  interface ProductMark {
    id: string;
    description: string;
    lastPrice: number;
    mark?: {
      description: string;
    };
  }

  interface Mark {
    id: string;
    description: string;
    createDate: string;
    active: boolean;
  }
}

export {}; // Isso é necessário para o TypeScript tratar como um módulo
