import express from 'express';
import Notificacao from './models/notif_models.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Rota raiz - Página de login
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pag_login/login.html'));
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

// Middleware 404
router.use((req, res) => {
  res.status(404).json({ message: 'Conteúdo não encontrado!' });
});

// Middleware de erro
router.use((err, req, res, next) => {
  res.status(err.code || 500).json({ message: err.message || 'Erro interno no servidor' });
});

export default router;
