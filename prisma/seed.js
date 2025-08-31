import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import pkg from '@prisma/client';
import Usuario from '../src/models/usuarios_models.js';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  const file = resolve('prisma', 'seeders.json');
  const seed = JSON.parse(readFileSync(file, 'utf-8'));

  // Inserir usuários (via seu model customizado)
  for (const user of seed.perfis) {
    await Usuario.create(user);
  }

  // Inserir notificações
  await prisma.notificacao.createMany({
    data: seed.notifications,
    skipDuplicates: true
  });

  // Inserir postagens
  await prisma.postagens.createMany({
    data: seed.posts,
    skipDuplicates: true
  });

  // Inserir categorias
  await prisma.extracurriculares.createMany({
    data: seed.categorias,
    skipDuplicates: true
  });
  console.log('✅ Categorias inseridas com sucesso!');

  // Buscar categorias para relacionar IDs
  const allCategorias = await prisma.extracurriculares.findMany();

  // Montar array com IDs corretos para atividades
  const atividadesComIds = seed.atividades.map(atividade => {
    const categoria = allCategorias.find(c => c.slug === atividade.slugCategoria);
    return {
      titulo: atividade.titulo,
      descricao: atividade.descricao,
      imagem: atividade.imagem,
      url: atividade.url,
      categoriaId: categoria ? categoria.Cod : null // ID correto do extracurriculares
    };
  }).filter(a => a.categoriaId !== null);

  // Inserir atividades
  await prisma.atividade.createMany({
    data: atividadesComIds,
    skipDuplicates: true
  });
  console.log('✅ Atividades inseridas com sucesso!');
}

main()
  .catch(e => {
    console.error('❌ Erro durante o seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
