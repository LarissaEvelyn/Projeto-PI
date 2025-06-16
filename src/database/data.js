// ✅ data.js
export const investments = [];
export const perfis = [];
export const posts = [];
export const notifications = [];

export const usuarios = [
  {
    email: 'hysia.milena@academico.ifpb.edu.br',
    senha: 'escola',
    nome: 'Hysia Milena',
    instituicao: 'IFPB'
  },
  {
    email: 'larissa.evelyn@academico.ifpb.edu.br',
    senha: 'atividade',
    nome: 'Larissa Evelyn',
    instituicao: 'IFPB'
  },
  {
    email: 'lara.ramalho@academico.ifpb.edu.br',
    senha: 'ifpb',
    nome: 'Lara Ramalho',
    instituicao: 'IFPB'
  }
];

export let sessaoAtiva = null;

export const state = { sessaoAtiva };
