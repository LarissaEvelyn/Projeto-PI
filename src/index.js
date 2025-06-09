import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Perfil } from './data/perfil.js';
import { login } from './data/login.js';

// Configuração de diretório __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Caminho absoluto para a pasta public (assumindo que está em /Projeto-PI/public)
const publicPath = path.join(__dirname, '..', '..', 'public');

// Inicialização do app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

// =======================
// POSTS (feed)
// =======================

const posts = [
  {
    id: uuidv4(),
    author: '@SearchAcademy',
    content: 'Seja Bem-Vindo(a) ao Feed!! 😁',
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString()
  }
];

class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const { author, content } = req.body;

  if (!author || !content) {
    throw new AppError('Autor e conteúdo são obrigatórios', 400);
  }

  const newPost = {
    id: uuidv4(),
    author,
    content,
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString()
  };

  posts.unshift(newPost);
  res.status(201).json(newPost);
});

app.post('/api/posts/:id/like', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);

  if (!post) {
    throw new AppError('Post não encontrado', 404);
  }

  post.likes += 1;
  res.json(post);
});

// =======================
// NOTIFICAÇÕES
// =======================

const notifications = [
  {
    text: "Interconecta divulga edital para concorrer à bolsas",
    photo: "person.jpeg",
    createdAt: Date.now() - 1000 * 60,
    unread: true,
  },
  {
    text: "Nova oferta de estágio para alunos de informática",
    photo: "person.jpeg",
    createdAt: Date.now() - 1000 * 60 * 5,
    unread: true,
  },
  {
    text: "Prova da OBMEP ocorrerá na terça-feira (03/06)",
    photo: "person.jpeg",
    createdAt: Date.now() - 1000 * 60 * 30,
    unread: true,
  },
  {
    text: "Como criar um currículo Lattes?",
    photo: "person.jpeg",
    createdAt: Date.now() - 1000 * 60 * 60,
    unread: false,
  },
  {
    text: "Hi Guys, I'm Ana",
    photo: "person.jpeg",
    createdAt: Date.now() - 1000 * 60 * 2,
    unread: true,
  },
];

app.get('/api/notificacoes', (req, res) => {
  res.json(notifications);
});

// =======================
// ROTAS DE PÁGINAS
// =======================

app.get('/notificacoes', (req, res) => {
  res.sendFile(path.join(publicPath, 'pag_notificacoes', 'notif.html'));
});

app.get('/tela_inicial', (req, res) => {
  res.sendFile(path.join(publicPath, 'pag_inicial', 'tela_inicial.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(publicPath, 'pag_login', 'login.html'));
});

//========================
// PERFIL 
//========================

const perfis = [
  {
    id: uuidv4(),
    name: 'Hysia Milena',
    email: 'hysia.milena@academico.ifpb.edu.br',
    passwd: 'escola',
    institution: 'ifpb',
    resume: './Hysia.pdf',
  },
  {
    id: uuidv4(),
    name: 'Larissa Evelyn',
    email: 'larissa.evelyn@academico.ifpb.edu.br',
    passwd: 'atividade',
    institution: 'ifpb',
    resume: './Larisa.pdf',
  },
  {
    id: uuidv4(),
    name: 'Lara Ramalho',
    email: 'lara.ramalho@academico.ifpb.edu.br',
    passwd: 'ifpb',
    institution: 'ifpb',
    resume: './Lara.pdf',
  }
];

// Rotas de Perfil
app.get('/api/perfis', (req, res) => {
  res.json(perfis);
});

app.post('/api/cadastro', (req, res) => {
  const { name, email, passwd, institution, resume } = req.body;

  // Validação básica
  if (!name || !email || !passwd || !institution) {
    throw new AppError('Nome, email, senha e instituição são obrigatórios', 400);
  }

  // Verificar se o email já existe
  if (perfis.some(perfil => perfil.email === email)) {
    throw new AppError('Email já cadastrado', 400);
  }

  const novoPerfil = {
    id: uuidv4(),
    name,
    email,
    passwd, // Em produção, usar bcrypt para hashear a senha
    institution,
    resume: resume || ''
  };

  perfis.push(novoPerfil);
  res.status(201).json(novoPerfil);
});


// =======================
// TRATAMENTO DE ERROS
// =======================

app.use((req, res, next) => {
  throw new AppError('Endpoint não encontrado', 404);
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      status: err.statusCode
    });
  }

  res.status(500).json({
    error: 'Erro interno no servidor',
    status: 500
  });
});

// ROTAS LOGIN 

// Dados de usuários (substitui 'login' por 'usuarios' para consistência)
const usuarios = [
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

let sessaoAtiva = null;

// Middleware para verificar sessão (reutilizável)
const verificarSessao = (req, res, next) => {
  if (!sessaoAtiva) {
    return res.status(403).json({
      status: 'erro',
      mensagem: 'Acesso não autorizado. Faça login primeiro.'
    });
  }
  next();
};

// Rota de login (POST)
app.post('/api/login', (req, res) => {
  try {
    // Validação dos dados
    const { email, senha } = req.body;
    if (!email || !senha) {
      throw new AppError('Email e senha são obrigatórios', 400);
    }

    // Busca o usuário
    const usuario = usuarios.find(u => u.email === email);
    if (!usuario || usuario.senha !== senha) {
      throw new AppError('Credenciais inválidas', 401);
    }

    // Cria a sessão (sem a senha)
    const { senha: _, ...usuarioSemSenha } = usuario;
    sessaoAtiva = usuarioSemSenha;

    // Resposta de sucesso
    res.json({
      status: 'sucesso',
      mensagem: 'Login realizado!',
      usuario: usuarioSemSenha,
      token: 'simulado-123-abc' // Em produção, usar JWT com expiração
    });

  } catch (erro) {
    // Resposta de erro
    res.status(erro.statusCode || 500).json({
      status: 'erro',
      mensagem: erro.message
    });
  }
});

// Rota de logout (GET)
app.get('/api/logout', (req, res) => {
  sessaoAtiva = null;
  res.json({ 
    status: 'sucesso',
    mensagem: 'Logout realizado com sucesso!' 
  });
});

// Rota de perfil (GET) - Protegida por sessão
app.get('/api/perfil', verificarSessao, (req, res) => {
  res.json({
    status: 'sucesso',
    usuario: sessaoAtiva
  });
});



// =======================
// INICIAR SERVIDOR
// =======================

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Endpoints disponíveis:');
  console.log('- GET    /api/posts');
  console.log('- POST   /api/posts');
  console.log('- POST   /api/posts/:id/like');
  console.log('- GET    /api/notificacoes');
  console.log('- GET    /notificacoes');
  console.log('- GET    /tela_inicial');
  console.log('- GET    /login');
  console.log(`- GET    /api/perfis`);
  console.log(`- POST   /api/cadastro`);
}); 