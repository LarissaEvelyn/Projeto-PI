// ✅ usuarios_models.js
import Database from '../database/database.js';

// ...existing code...

async function login(email, senha) {
  const db = await Database.connect();
  const sql = `SELECT * FROM Estudante WHERE email = ?`;
  const usuario = await db.get(sql, [email]);
  if (!usuario || usuario.senha !== senha) {
    throw new Error('Credenciais inválidas');
  }
  const { senha: _, ...usuarioSemSenha } = usuario;
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

async function create({ nome, email, senha, instituicao, telefone }){
  const db = await Database.connect()
  const sql = `
    INSERT INTO Estudante (nome, email, senha, instituicao, telefone )
    VALUES (?, ?, ?, ?, ?)
  `;

  const { lastID } = await db.run(sql, [nome, email, senha, instituicao, telefone]);
  return lastID;
}

async function verificarCadastro(email) {
  const db = await Database.connect();
  const sql = `SELECT * FROM Estudante WHERE email = ?`;
  const usuario = await db.get(sql, [email]);
  if (usuario) {
    // Usuário já cadastrado, deve ser redirecionado para login
    return { cadastrado: true };
  } else {
    // Usuário não cadastrado
    return { cadastrado: false };
  }
}


