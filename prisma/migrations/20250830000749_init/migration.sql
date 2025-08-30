-- CreateTable
CREATE TABLE "Estudante" (
    "Cod_estudante" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nome" TEXT,
    "Email" TEXT,
    "Senha" TEXT,
    "Instituicao" TEXT,
    "Telefone" TEXT
);

-- CreateTable
CREATE TABLE "Extracurriculares" (
    "Cod" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nome" TEXT,
    "Descricao" TEXT
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "Cod" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Descricao" TEXT,
    "Data_emissao" DATETIME
);

-- CreateTable
CREATE TABLE "Professor" (
    "Cod_Professor" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT,
    "Nome" TEXT,
    "Senha" TEXT
);

-- CreateTable
CREATE TABLE "Postagens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "autor" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Curtido" (
    "cod_estu" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,

    PRIMARY KEY ("cod_estu", "id_post"),
    CONSTRAINT "Curtido_cod_estu_fkey" FOREIGN KEY ("cod_estu") REFERENCES "Estudante" ("Cod_estudante") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Curtido_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "Postagens" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
