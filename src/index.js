import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes.js';
import Seed from './database/seeders.js';

// Função principal async para permitir uso de await no Seed.up()
async function main() {
  const server = express();

  // Middleware de log
  server.use(morgan('tiny'));

  // Middleware de CORS
  server.use(
    cors({
      origin: '*',
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      preflightContinue: false,
    })
  );

  // Middleware para JSON
  server.use(express.json());

  // Servir arquivos estáticos
  server.use(express.static('public'));

  server.use('/', router); 

  // Popular dados simulados (memória)
  await Seed.up();

  // Iniciar o servidor
  server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });
}

// Executar a função principal
main().catch(err => {
  console.error('Erro ao iniciar o servidor:', err);
});
