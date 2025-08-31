import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// Ler todos os perfis ou filtrar por campo/valor
async function read(field, value) {
  if (field && value) {
    return await prisma.estudante.findMany({
      where: {
        [field]: {
          contains: value,
          mode: 'insensitive',
        },
      },
      orderBy: {
        Cod_estudante: 'asc',
      },
    });
  }

  return await prisma.estudante.findMany({
    orderBy: {
      Cod_estudante: 'asc',
    },
  });
}

// Ler perfil por ID
async function readById(id) {
  const estudante = await prisma.estudante.findUnique({
    where: {
      Cod_estudante: Number(id),
    },
  });

  if (!estudante) {
    throw new Error('Estudante não encontrado');
  }

  return estudante;
}

// Atualizar perfil por ID
async function update(id, { Nome, Email, Instituicao, Telefone, Senha }) {
  return await prisma.estudante.update({
    where: {
      Cod_estudante: Number(id),
    },
    data: {
      Nome,
      Email,
      Instituicao,
      Telefone,
      Senha,
    },
  });
}

export default { read, readById, update };
