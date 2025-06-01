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

// Rota para a página de notificações
app.get('/notificacoes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notificacoes/notificacoes.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
