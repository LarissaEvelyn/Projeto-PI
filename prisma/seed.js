import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import pkg from '@prisma/client';
import Usuario from '../src/models/usuarios_models.js'; 
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  const file = resolve('prisma', 'seeders.json');
  const seed = JSON.parse(readFileSync(file, 'utf-8'));
  for (const user of seed.perfis) {
    await Usuario.create(user);
  }

  await prisma.notificacao.createMany({
    data: seed.notifications,
  });

  await prisma.postagens.createMany({
    data: seed.posts,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Erro durante o seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });