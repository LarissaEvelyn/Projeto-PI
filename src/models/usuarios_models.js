// ✅ usuarios_models.js
import { usuarios, sessaoAtiva as state } from '../database/data.js';

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

export default { login, logout, getPerfil };
