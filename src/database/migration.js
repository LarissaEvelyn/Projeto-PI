import Database from './database.js';

async function up() {
  const db = await Database.connect();

  const estudante = `
    CREATE TABLE Estudante (
      Cod_estudante INTEGER PRIMARY KEY,
      Nome VARCHAR(40),
      Email VARCHAR(40),
      Senha VARCHAR(20),
      Instituicao VARCHAR(40),
      Telefone VARCHAR(15)
)`;
 
  await db.run(estudante);
    
const extracurriculares = `
    CREATE TABLE Extracurriculares (
      Cod INTEGER PRIMARY KEY,
      Nome VARCHAR(40),
      Descricao VARCHAR(100)
      )`;;
 
  await db.run(extracurriculares);

  const notificacoes = `
    CREATE TABLE Notificacao (
      Cod INTEGER PRIMARY KEY,
      Descricao VARCHAR(100),
      Data_emissao DATE
      )`;
 
  await db.run(notificacoes);
   
  const professor = `
    CREATE TABLE Professor (
      Cod_Professor INTEGER PRIMARY KEY,
      Email VARCHAR(40),
      Nome VARCHAR(40),
      Senha VARCHAR(20)
      )`;
 
  await db.run(professor);
  
  }
 
export default { up };