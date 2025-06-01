import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware para servir arquivos estáticos (CSS, JS, imagens, etc)
app.use(express.static(path.join(__dirname, 'public')));

// MOCK: Dados das notificações (array temporário)
const notifications = [
  {
    text: "Interconecta divulga edital para concorrer à bolsas",
    photo: "person.jpeg",
    createdAt: Date.now() - 1000 * 60, // 1 minuto atrás
    unread: true,
  },
  {
    text: "Nova oferta de estágio para alunos de informática",
    photo: "person.jpeg",
    createdAt: Date.now() - 1000 * 60 * 5, // 5 minutos atrás
    unread: true,
  },
  {
    text: "Prova da OBMEP ocorrerá na terça-feira (03/06)",
    photo: "person.jpeg",
    createdAt: Date.now() - 1000 * 60 * 30, // 30 minutos atrás
    unread: true,
  },
  {
    text: "Como criar um currículo Lattes?",
    photo: "person.jpeg",
    createdAt: Date.now() - 1000 * 60 * 60, // 1 hora atrás
    unread: false,
  },
  {
    text: "Hi Guys, I'm Ana",
    photo: "person.jpeg",
    createdAt: Date.now() - 1000 * 60 * 2, // 2 minutos atrás
    unread: true,
  },
];

// ✅ Rota da API para retornar notificações
app.get('/api/notificacoes', (req, res) => {
  res.json(notifications);
});

// Rota para a página de notificações
app.get('/notificacoes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notificacoes/notificacoes.html'));
});

// Rota para a tela inicial
app.get('/tela_inicial', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/tela_inicial/tela_inicial.html'));
});

// Rota para a tela de perfil
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login/perfil.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
