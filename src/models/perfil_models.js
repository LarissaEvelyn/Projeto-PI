import dbModule from '../database/database.js';

class Perfil {
  // Lê todos os perfis ou filtra por campo/valor
  static async read(field, value) {
    const db = await dbModule.connect();
    let sql = `SELECT * FROM Estudante`;
    let params = [];
   
    if (field && value) {
      sql += ` WHERE ${field} LIKE ?`;
      params.push(`%${value}%`);
    }
   
    return db.all(sql, params);
  }

  // Lê perfil por ID
  static async readById(id) {
    const db = await dbModule.connect();
    const student = await db.get(
      'SELECT * FROM Estudante WHERE Cod_estudante = ?',
      [id]
    );
   
    if (!student) {
      throw new Error('Estudante não encontrado');
    }
   
    return student;
  }

  // Atualiza perfil por ID
  static async update(id, data) {
    const db = await dbModule.connect();
   
    const updates = [];
    const params = [];
   
    if (data.Nome !== undefined) {
      updates.push('Nome = ?');
      params.push(data.Nome);
    }
    if (data.Email !== undefined) {
      updates.push('Email = ?');
      params.push(data.Email);
    }
    if (data.Instituicao !== undefined) {
      updates.push('Instituicao = ?');
      params.push(data.Instituicao);
    }
    if (data.Telefone !== undefined) {
      updates.push('Telefone = ?');
      params.push(data.Telefone);
    }
    if (data.Senha !== undefined) {
      updates.push('Senha = ?');
      params.push(data.Senha);
    }

    if (updates.length === 0) {
      return this.readById(id);
    }

    const query = `
      UPDATE Estudante
      SET ${updates.join(', ')}
      WHERE Cod_estudante = ?
    `;
   
    params.push(id);
   
    const { changes } = await db.run(query, params);
   
    if (changes === 0) {
      throw new Error('Nenhum registro atualizado');
    }
   
    return this.readById(id);
  }
}

export default Perfil;
