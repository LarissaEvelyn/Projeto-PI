// notif_models.js
import prisma from '../database/database.js';

// Criar notificação
async function create({ text, photo = 'person.jpeg', unread = true }) {
  if (!text) throw new Error('Texto da notificação é obrigatório');

  const nova = await prisma.notificacao.create({
    data: { text, photo, unread, createdAt: new Date() },
  });

  return nova;
}

// Ler notificações (com filtro opcional)
async function read(campo, valor) {
  if (!campo || !valor) {
    return await prisma.notificacao.findMany();
  }
  return await prisma.notificacao.findMany({
    where: { [campo]: { contains: valor } },
  });
}

// Buscar por ID
async function readById(id) {
  const n = await prisma.notificacao.findUnique({ where: { id } });
  if (!n) throw new Error('Notificação não encontrada');
  return n;
}

// Atualizar notificação
async function update({ id, ...dados }) {
  const n = await prisma.notificacao.update({
    where: { id },
    data: dados,
  });
  return n;
}

// Remover notificação
async function remove(id) {
  await prisma.notificacao.delete({ where: { id } });
}

export default { create, read, readById, update, remove };
