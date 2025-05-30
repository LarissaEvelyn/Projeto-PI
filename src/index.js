import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));

// Rota principal
app.get('/', (req, res) => {
  res.send('Backend API for the app');
});

// -------- ROTAS PARA FUNCIONALIDADES ---------

// Categorias
app.get('/categorias', (req, res) => {
  res.json({ message: 'Listando categorias' });
});

app.post('/categorias', (req, res) => {
  const { nome } = req.body;
  res.json({ message: `Categoria ${nome} criada com sucesso!` });
});

// Feed
app.get('/feed', (req, res) => {
  res.json({ message: 'Exibindo feed' });
});

// Login
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  // Aqui normalmente faria a validação
  res.json({ message: `Usuário ${usuario} logado com sucesso!` });
});

// Notificações
app.get('/notificacoes', (req, res) => {
  res.json({ message: 'Listando notificações' });
});

// Tela Inicial
app.get('/tela-inicial', (req, res) => {
  res.json({ message: 'Bem-vindo à tela inicial!' });
});

// Tela Login
app.get('/tela-login', (req, res) => {
  res.json({ message: 'Tela de login carregada' });
});

// -------- MIDDLEWARES DE ERRO ---------

// 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

// 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Iniciando o servidor
app.listen(3000, () => {
  console.log('App running on port 3000');
});
