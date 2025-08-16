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

  let sql = `SELECT id, autor, conteudo, time FROM Postagens`;
  const params = [];

  if (field && value) {
    sql += ` WHERE ${field} = ?`;
    params.push(value);
  }

  sql += ` ORDER BY time DESC`;
  return await db.all(sql, params);
}

async function readById(id) {
  const db = await Database.connect();
  const sql = `SELECT id, autor, conteudo, time FROM Postagens WHERE id = ?`;
  return await db.get(sql, [id]);
}

async function update(id, { autor, conteudo }) {
  const db = await Database.connect();
  const sql = `
    UPDATE Postagens 
    SET autor = ?, conteudo = ?, time = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  await db.run(sql, [autor, conteudo, id]);
  return await readById(id);
}

async function remove(id) {
  const db = await Database.connect();
  const sql = `DELETE FROM Postagens WHERE id = ?`;
  return await db.run(sql, [id]);
}

// Adicionar like
async function like(codEstudante, idPost) {
  const db = await Database.connect();
  const sql = `INSERT INTO Curtido (cod_estu, id_post) VALUES (?, ?)`;
  await db.run(sql, [codEstudante, idPost]);
  return getLikes(idPost);
}

// Remover like
async function unlike(codEstudante, idPost) {
  const db = await Database.connect();
  const sql = `DELETE FROM Curtido WHERE cod_estu = ? AND id_post = ?`;
  await db.run(sql, [codEstudante, idPost]);
  return getLikes(idPost);
}

// Contar likes de um post
async function getLikes(idPost) {
  const db = await Database.connect();
  const sql = `SELECT COUNT(*) as total FROM Curtido WHERE id_post = ?`;
  const result = await db.get(sql, [idPost]);
  return result.total;
}

export default { create, read, readById, update, remove, like, unlike, getLikes };
