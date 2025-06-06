import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import { Perfil } from 'data/perfil.js'

// Configuração inicial
const server = express();
server.use(morgan('dev'));
server.use(express.static('public'));
server.use(cors());
server.use(express.json());
server.use(express.static('public'));

// Dados em memória
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


// Classe de erro personalizado
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Rotas
// ======

// Rotas de Posts
server.get('/api/posts', (req, res) => {
  res.json(posts);
});

server.post('/api/posts', (req, res) => {
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

server.post('/api/posts/:id/like', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);

  if (!post) {
    throw new AppError('Post não encontrado', 404);
  }

  post.likes += 1;
  res.json(post);
});

// Rotas de Categorias
server.get('/api/categories', (req, res) => {
  res.json(categories);
});


// Tratamento de erros
// ==================

// Rota não encontrada (404)
server.use('/api', (req, res, next) => {
  throw new AppError('Endpoint não encontrado', 404);
});

// Manipulador de erros global
server.use((err, req, res, next) => {
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

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta 3000`);
  console.log('Endpoints disponíveis:');
  console.log(`- GET    /api/posts`);
  console.log(`- POST   /api/posts`);
  console.log(`- POST   /api/posts/:id/like`);
  console.log(`- GET    /api/categories`);
 
});
//rotasdecadastro 
server.post ("/api/cadastro",(req, res) => {
  let name = req.body.name;

        name: 'Hysia Milena',
        email: 'hysia.milena@academico.ifpb.edu.br',
        passwd: 'escola',
        institution: 'ifpb',
        resume: './Hysia.pdf',
    },
    {
        name: 'Larissa Evelyn',
        email: 'larissa.evelyn@academico.ifpb.edu.br',
        passwd: 'atividade',
        institution: 'ifpb',
        resume: './Larisa.pdf',
    },
    {
        name: 'Lara Ramalho',
        email: 'lara.ramalho@academico.ifpb.edu.br',
        passwd: 'ifpb',
        institution: 'ifpb',
        resume: './Lara.pdf',
    },
];
})