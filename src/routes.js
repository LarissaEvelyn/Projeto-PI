import express from 'express';
import Notificacao from './models/notif_models.js';
import Postagens from './models/post_models.js';
import Perfil from './models/perfil_models.js';
import Usuario from './models/usuarios_models.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* ==============================
   ROTAS ESTÁTICAS
================================*/

// Rota raiz - Página de login/cadastro
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/cadastro/cadastro.html'));
});

// Página de login
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login/login.html'));
});

// Página principal (feed)
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/feed/feed.html'));
});

// Página de perfil
router.get('/perfil', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/perfil/perfil.html'));
});


/* ==============================
   ROTAS DE NOTIFICAÇÕES
================================*/

router.post('/notificacoes', async (req, res, next) => {
  try {
    const notificacao = req.body;
    const criada = await Notificacao.create(notificacao);
    res.status(201).json(criada);
  } catch (error) {
    next(error);
  }
});

router.get('/notificacoes', async (req, res, next) => {
  try {
    const { text } = req.query;
    const resultado = await Notificacao.read('text', text);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
});

router.get('/notificacoes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await Notificacao.readById(id);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
});

router.put('/notificacoes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const notificacao = req.body;
    const atualizada = await Notificacao.update({ ...notificacao, id });
    res.json(atualizada);
  } catch (error) {
    next(error);
  }
});

router.delete('/notificacoes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Notificacao.remove(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});


/* ==============================
   ROTAS DE POSTAGENS (FEED)
================================*/

router.post('/postagens', async (req, res) => {
  try {
    const { autor, conteudo } = req.body;
    const createdPost = await Postagens.create({ autor, conteudo });
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/postagens', async (req, res) => {
  try {
    const { autor } = req.query;
    const posts = await Postagens.read(autor ? 'autor' : null, autor);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar postagens' });
  }
});

router.get('/postagens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Postagens.readById(id);
    if (!post) return res.status(404).json({ message: 'Post não encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar postagem' });
  }
});

router.put('/postagens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { autor, conteudo } = req.body;
    const atualizado = await Postagens.update(id, { autor, conteudo });
    res.json(atualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar postagem' });
  }
});

router.delete('/postagens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Postagens.remove(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar postagem' });
  }
});

// Like
router.post('/postagens/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const { codEstudante } = req.body;
    const total = await Postagens.like(codEstudante, id);
    res.json({ likes: total });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Unlike
router.delete('/postagens/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const { codEstudante } = req.body;
    const total = await Postagens.unlike(codEstudante, id);
    res.json({ likes: total });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Total de likes
router.get('/postagens/:id/likes', async (req, res) => {
  try {
    const { id } = req.params;
    const total = await Postagens.getLikes(id);
    res.json({ likes: total });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar likes' });
  }
});


/* ==============================
   ROTAS DE PERFIL
================================*/

router.get('/api/perfil', async (req, res, next) => {
  try {
    const { text } = req.query;
    const resultado = await Perfil.read('Nome', text);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
});

router.get('/api/perfil/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await Perfil.readById(id);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
});

router.put('/api/perfil/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const perfilData = req.body;
    const atualizado = await Perfil.update(id, perfilData);
    res.json(atualizado);
  } catch (error) {
    next(error);
  }
});


/* ==============================
   ROTAS DE USUÁRIO
================================*/

// Cadastro
router.post('/cadastro', async (req, res, next) => {
  try {
    const { nome, email, senha, instituicao, telefone } = req.body;
    const criado = await Usuario.create({ nome, email, senha, instituicao, telefone });
    res.status(201).json(criado);
  } catch (error) {
    next(error);
  }
});

// Verificação de cadastro
router.post('/verificar-cadastro', async (req, res, next) => {
  try {
    const { email } = req.body;
    const resultado = await Usuario.verificarCadastro(email);
    if (resultado.cadastrado) {
      res.status(200).json({ redirect: '/login', message: 'Usuário já cadastrado. Redirecionando para login.' });
    } else {
      res.status(200).json({ redirect: null, message: 'Usuário não cadastrado. Pode prosseguir com cadastro.' });
    }
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.login(email, senha);
    if (!usuario) {
      return res.status(401).json({ sucesso: false, mensagem: 'E-mail ou senha incorretos!' });
    }
    res.status(200).json({ sucesso: true, usuario });
  } catch (error) {
    res.status(401).json({ sucesso: false, mensagem: error.message || 'E-mail ou senha incorretos!' });
  }
});



router.use((req, res) => {
  res.status(404).json({ message: 'Conteúdo não encontrado!' });
});

router.use((err, req, res, next) => {
  res.status(err.code || 500).json({ message: err.message || 'Erro interno no servidor' });
});

export default router;
