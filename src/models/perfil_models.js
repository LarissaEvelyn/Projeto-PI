import { v4 as uuidv4 } from 'uuid';
import { perfis } from '../database/data.js';

function create({ name, email, passwd, institution, resume = '' }) {
  if (!name || !email || !passwd || !institution) {
    throw new Error('Nome, email, senha e instituição são obrigatórios');
  }

  if (perfis.some(perfil => perfil.email === email)) {
    throw new Error('Email já cadastrado');
  }

  const novoPerfil = {
    id: uuidv4(),
    name,
    email,
    passwd,
    institution,
    resume,
  };

  perfis.push(novoPerfil);
  return novoPerfil;
}

function read() {
  return perfis;
}

export default { create, read };
