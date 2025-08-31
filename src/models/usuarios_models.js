// ✅ usuarios_models.js
import prisma from '../database/database.js';

// ...existing code...

async function login(email, senha) {
  const usuario = await prisma.estudante.findFirst({
    where: { Email: email },
  });
  if (!usuario || usuario.Senha !== senha) {
    return null;
  }
  const { Senha, ...usuarioSemSenha } = usuario;
  return usuarioSemSenha;
}

// ...existing code...

export default { login, logout, getPerfil, create, verificarCadastro };
function logout() {
  state.sessaoAtiva = null;
  return true;
}

function getPerfil() {
  if (!state.sessaoAtiva) throw new Error('Acesso não autorizado. Faça login primeiro.');
  return state.sessaoAtiva;
}

async function create({ nome, email, senha, instituicao, telefone }) {
  const estudante = await prisma.estudante.create({
    data: {
      Nome: nome,
      Email: email,
      Senha: senha,
      Instituicao: instituicao,
      Telefone: telefone,
    },
  });
  return estudante;
}

async function verificarCadastro(email) {
  const usuario = await prisma.estudante.findFirst({
    where: { Email: email },
  });
  if (usuario) {
    return { cadastrado: true };
  } else {
    return { cadastrado: false };
  }
}


