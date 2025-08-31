/*
  Warnings:

  - The primary key for the `Extracurriculares` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Cod` on the `Extracurriculares` table. All the data in the column will be lost.
  - You are about to drop the column `Descricao` on the `Extracurriculares` table. All the data in the column will be lost.
  - You are about to drop the column `Nome` on the `Extracurriculares` table. All the data in the column will be lost.
  - Added the required column `iconClass` to the `Extracurriculares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Extracurriculares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Extracurriculares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Extracurriculares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Extracurriculares` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Estudante_Email_key";

-- CreateTable
CREATE TABLE "Atividade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT,
    "url" TEXT,
    "extracurricularId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Atividade_extracurricularId_fkey" FOREIGN KEY ("extracurricularId") REFERENCES "Extracurriculares" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Extracurriculares" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "slug" TEXT NOT NULL,
    "iconClass" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
DROP TABLE "Extracurriculares";
ALTER TABLE "new_Extracurriculares" RENAME TO "Extracurriculares";
CREATE UNIQUE INDEX "Extracurriculares_slug_key" ON "Extracurriculares"("slug");
CREATE TABLE "new_Notificacao" (
    "Cod" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Descricao" TEXT,
    "Data_emissao" DATETIME,
    "estudanteCod_estudante" INTEGER,
    CONSTRAINT "Notificacao_estudanteCod_estudante_fkey" FOREIGN KEY ("estudanteCod_estudante") REFERENCES "Estudante" ("Cod_estudante") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Notificacao" ("Cod", "Data_emissao", "Descricao") SELECT "Cod", "Data_emissao", "Descricao" FROM "Notificacao";
DROP TABLE "Notificacao";
ALTER TABLE "new_Notificacao" RENAME TO "Notificacao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
