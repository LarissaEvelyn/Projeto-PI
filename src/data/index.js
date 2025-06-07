import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configuração de diretório __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicialização do app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
  res.sendFile(path.join(__dirname, 'public/pag_notificacoes/notif.html'));
});

app.get('/tela_inicial', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pag_inicial/tela_inicial.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pag_login/perfil.html'));
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
});
