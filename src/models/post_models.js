import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function create({ autor, conteudo }) {
  if (!autor || !conteudo) {
    throw new Error('Autor e conteúdo são obrigatórios');
  }

  return await prisma.postagens.create({
    data: {
      autor,
      conteudo,
    },
  });
}

async function read(field, value) {
  if (field && value) {
    return await prisma.postagens.findMany({
      where: {
        [field]: value,
      },
      orderBy: {
        time: 'desc',
      },
    });
  } else {
    return await prisma.postagens.findMany({
      orderBy: {
        time: 'desc',
      },
    });
  }
}

async function readById(id) {
  return await prisma.postagens.findUnique({
    where: {
      id: id,
    },
  });
}

async function update(id, { autor, conteudo }) {
  return await prisma.postagens.update({
    where: {
      id: id,
    },
    data: {
      autor,
      conteudo,
      time: new Date(), // Prisma entende o Date do JavaScript
    },
  });
}

async function remove(id) {
  return await prisma.postagens.delete({
    where: {
      id: id,
    },
  });
}

// Adicionar like
async function like(codEstudante, idPost) {
  return await prisma.curtido.create({
    data: {
      cod_estu: codEstudante,
      id_post: idPost,
    },
  });
}

// Remover like
async function unlike(codEstudante, idPost) {
  return await prisma.curtido.delete({
    where: {
      cod_estu_id_post: {
        cod_estu: codEstudante,
        id_post: idPost,
      },
    },
  });
}

// Contar likes de um post
async function getLikes(idPost) {
  return await prisma.curtido.count({
    where: {
      id_post: idPost,
    },
  });
}

export default { create, read, readById, update, remove, like, unlike, getLikes };
