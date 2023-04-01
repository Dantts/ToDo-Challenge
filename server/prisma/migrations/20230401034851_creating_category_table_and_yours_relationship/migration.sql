/*
  Warnings:

  - Added the required column `categoryId` to the `Todos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Categoies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Categoies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Todos_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categoies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Todos" ("createdAt", "id", "isComplete", "title", "updatedAt", "categoryId") SELECT "createdAt", "id", "isComplete", "title", "updatedAt", 1 FROM "Todos";
DROP TABLE "Todos";
ALTER TABLE "new_Todos" RENAME TO "Todos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
