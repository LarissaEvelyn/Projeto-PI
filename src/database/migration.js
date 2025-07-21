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
    )`;
 
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
  
  const postagens = `
  CREATE TABLE Postagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    autor TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    time DATETIME DEFAULT CURRENT_TIMESTAMP
  )`;

  await db.run(postagens);

  const curtida = `
  CREATE TABLE Curtido (
  cod_estu INTEGER,
  id_post INTEGER,
  PRIMARY KEY (cod_estu, id_post),
  FOREIGN KEY (cod_estu) REFERENCES Estudante (Cod_Estudante)
  FOREIGN KEY (id_post) REFERENCES Postagens (id)
  )`;

  await db.run(curtida);

}
 
export default { up };