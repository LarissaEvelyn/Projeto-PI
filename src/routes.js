import express from 'express';
import Notificacao from './models/notif_models.js';
import Postagens from './models/post_models.js';
import Perfil from './models/perfil_models.js';
import Usuario from './models/usuarios_models.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Database } from 'sqlite-async';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Rota raiz - Página de login
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/cadastro/cadastro.html'));
});

//  Rotas de notificações
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

//Rotas do Feed
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

// Dar like em uma postagem
router.post('/postagens/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const { codEstudante } = req.body; // precisa passar no front quem é o usuário logado
    const total = await Postagens.like(codEstudante, id);
    res.json({ likes: total });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remover like
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

// Obter total de likes
router.get('/postagens/:id/likes', async (req, res) => {
  try {
    const { id } = req.params;
    const total = await Postagens.getLikes(id);
    res.json({ likes: total });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar likes' });
  }
});

// Rotas de perfis (padronizadas para /api/perfil)
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
    console.log('Atualizado', atualizado);
    res.json(atualizado);
  } catch (error) {
    next(error);
  }
});


// Cadastro
router.post('/cadastro', async (req, res, next) => {
  try {
    const {nome, email, senha, instituicao, telefone} = req.body;
    const criado = await Usuario.create({ nome, email, senha, instituicao, telefone });
    console.log(nome)
    res.status(201).json(criado);
  } catch (error) {
    next(error);
  }
});

// Verificação de cadastro de usuário
router.post('/verificar-cadastro', async (req, res, next) => {
  try {
    const { email } = req.body;
    const resultado = await Usuario.verificarCadastro(email);
    if (resultado.cadastrado) {
      // Usuário já cadastrado, informar para redirecionar para login
      res.status(200).json({ redirect: '/login', message: 'Usuário já cadastrado. Redirecionando para login.' });
    } else {
      // Usuário não cadastrado, pode prosseguir com cadastro
      res.status(200).json({ redirect: null, message: 'Usuário não cadastrado. Pode prosseguir com cadastro.' });
    }
  } catch (error) {
    next(error);
  }
});

// Rota de login
router.post('/login', async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    // Consulta o usuário no banco de dados
    const db = await Database.connect(); // ou Database.connect(), dependendo do seu model
    const sql = `SELECT * FROM Estudante WHERE email = ?`;
    const usuario = await db.get(sql, [email]);

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos!' });
    }

    // Não envie a senha para o frontend
    const { senha: _, ...usuarioSemSenha } = usuario;
    // Aqui você pode salvar sessão/cookie se quiser

    res.status(200).json({ message: 'Login bem-sucedido!', usuario: usuarioSemSenha });
  } catch (error) {
    next(error);
  }
});

// Middleware 404
router.use((req, res) => {
  res.status(404).json({ message: 'Conteúdo não encontrado!' });
});

// Middleware de erro
router.use((err, req, res, next) => {
  res.status(err.code || 500).json({ message: err.message || 'Erro interno no servidor' });
});

export default router;
