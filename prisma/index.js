import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Buscar estudante já cadastrado
  const estudante = await prisma.estudante.findFirst();

  if (!estudante) {
    console.log("Nenhum estudante encontrado no banco!");
    return;
  }

  console.log("Estudante encontrado:", estudante);

  // Criar notificação associada
  const novaNotificacao = await prisma.notificacao.create({
    data: {
      Descricao: "Prova marcada para amanhã!",
      Data_emissao: new Date(),
      estudanteCod_estudante: estudante.Cod_estudante,
    },
  });

  console.log("Notificação criada:", novaNotificacao);

  // Buscar estudante com notificações
  const estudanteComNotificacoes = await prisma.estudante.findUnique({
    where: { Cod_estudante: estudante.Cod_estudante },
    include: { notificacoes: true },
  });

  console.log("Estudante com notificações:", estudanteComNotificacoes);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
