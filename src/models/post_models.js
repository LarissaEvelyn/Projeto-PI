import Database from '../database/database.js';

async function create({ autor, conteudo }) {
  const db = await Database.connect();
  
  if (!autor || !conteudo) {
    throw new Error('Autor e conteúdo são obrigatórios');
  }

  const sql = `
    INSERT INTO Postagens (autor, conteudo)
    VALUES (?, ?)
  `;

  const { lastID } = await db.run(sql, [autor, conteudo]);
  return await readById(lastID);
}

async function read(field, value) {
  const db = await Database.connect();
  
  let sql = `SELECT id, autor, conteudo FROM Postagens`;
  const params = [];

  if (field && value) {
    sql += ` WHERE ${field} = ?`;
    params.push(value);
  }

  sql += ` ORDER BY Time DESC`;
  
  return await db.all(sql, params);
}

//function like(id) {
//  const post = posts.find(p => p.id === id);
//  if (!post) throw new Error('Post não encontrado');
//  post.likes += 1;
//  return post;
//}

export default { create, read };
