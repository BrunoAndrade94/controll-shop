-- CreateTable
CREATE TABLE "locals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL,
    "active" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "marks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL,
    "active" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "codeBar" TEXT NOT NULL,
    "lastPrice" REAL NOT NULL,
    "markId" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL,
    "active" BOOLEAN NOT NULL,
    CONSTRAINT "products_markId_fkey" FOREIGN KEY ("markId") REFERENCES "marks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "buys" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buyDate" DATETIME NOT NULL,
    "countProducts" INTEGER NOT NULL,
    "totalValue" REAL NOT NULL,
    "localId" TEXT NOT NULL,
    CONSTRAINT "buys_localId_fkey" FOREIGN KEY ("localId") REFERENCES "locals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "buy-products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buyId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "unitPrice" REAL NOT NULL,
    "totalPrice" REAL NOT NULL,
    CONSTRAINT "buy-products_buyId_fkey" FOREIGN KEY ("buyId") REFERENCES "buys" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "buy-products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "locals_description_key" ON "locals"("description");

-- CreateIndex
CREATE UNIQUE INDEX "marks_description_key" ON "marks"("description");

-- CreateIndex
CREATE UNIQUE INDEX "products_description_key" ON "products"("description");
