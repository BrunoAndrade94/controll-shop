import { Mark as Mark$1, Local as Local$1, Product as Product$1 } from 'core';

interface BuyProducts {
    id: string;
    buyId: string;
    productId: string;
    amount: number;
    unitPrice: number;
    totalPrice: number;
}

interface Local {
    id: string;
    description: string;
    createDate: Date;
    active: boolean;
}

interface Mark {
    id: string;
    description: string;
    createDate: Date;
    active: boolean;
}

interface Product {
    id: string;
    description: string;
    markId: string;
    mark?: Mark$1;
    codeBar: string;
    lastPrice: number;
    active: boolean;
    createDate: Date;
}

interface Buy {
    id: string;
    buyDate: Date;
    localId: string;
    products: BuyProducts[];
    countProducts: number;
    totalValue: number;
}

declare const buys: Buy[];

declare const locals: Local[];

declare const marks: Mark[];

declare const products: Product[];

declare function CreateEmptyBuy(): Partial<Buy>;

declare function CreateEmptyLocal(): Partial<Local>;

declare function CreateEmptyMark(): Partial<Mark>;

declare function CreateEmptyProduct(): Partial<Product>;

declare function ComplementLocal(partialLocal: Partial<Local$1>): Local$1;

declare function ComplementMark(partialMark: Partial<Mark$1>): Mark$1;

declare function ComplementProduct(partialProduct: Partial<Product$1>): Product$1;

declare function CalcTotalPrice(amount: number, price: number): number;

type Items = {
    amount: number;
    unitPrice: number;
}[];
declare function CalcTotalValueBuy(items: Items): number;

declare function FormartMoney(valor: number): string;

declare function FormartStringMoney(valor: string): number;

declare function FormatToFixed(value: number, toFixed?: number): number;

declare function UpdateProduct(product: Partial<Product>): Partial<Product>;

declare class Data {
    static format(data: Date): string;
    static unformat(data: string): Date;
}

declare class Id {
    static new(): string;
    static validadeId(id: string): boolean;
}

declare class TotalValue {
    static calculateTotalValue(product: BuyProducts): number;
    static calculateTotalValue2(amout: number, unitPrice: number): number;
}

declare const _default$1: {
    GetLocalAll: string;
    GetLocalDescription: string;
};

declare const _default: {
    GetProductAll: string;
    GetProductDescription: string;
};

export { type Buy, type BuyProducts, CalcTotalPrice, CalcTotalValueBuy, ComplementLocal, ComplementMark, ComplementProduct, CreateEmptyBuy, CreateEmptyLocal, CreateEmptyMark, CreateEmptyProduct, Data, FormartMoney as FormatMoney, FormartStringMoney as FormatStringMoney, FormatToFixed, Id, type Local, _default$1 as LocalRoute, type Mark, type Product, _default as ProductRoute, TotalValue, UpdateProduct, buys as constBuys, locals as constLocals, marks as constMarks, products as constProducts };
