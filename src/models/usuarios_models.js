// ✅ usuarios_models.js
import Database from '../database/database.js';

function login(email, senha) {
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario || usuario.senha !== senha) {
    throw new Error('Credenciais inválidas');
  }

  const { senha: _, ...usuarioSemSenha } = usuario;
  state.sessaoAtiva = usuarioSemSenha;
  return usuarioSemSenha;
}

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

export default { login, logout, getPerfil, create };
