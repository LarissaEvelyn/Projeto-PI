import dbModule from '../database/database.js';


class Perfil {
  static async create(perfil) {
    const db = await dbModule.connect();
    const { lastID } = await db.run(
      `INSERT INTO Estudante (Nome, Email, Senha, Instituicao, Telefone)
       VALUES (?, ?, ?, ?, ?)`,
      [
        perfil.nome,
        perfil.email,
        perfil.senha,
        perfil.instituicao,
        perfil.telefone
      ]
    );
    return this.readById(lastID);
  }


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


  static async update(id, data) {
    const db = await dbModule.connect();
   
    const updates = [];
    const params = [];
   
    if (data.Nome) {
      updates.push('Nome = ?');
      params.push(data.Nome);
    }
    if (data.Email) {
      updates.push('Email = ?');
      params.push(data.Email);
    }
    if (data.Instituicao) {
      updates.push('Instituicao = ?');
      params.push(data.Instituicao);
    }
    if (data.Telefone) {
      updates.push('Telefone = ?');
      params.push(data.Telefone);
    }
    if (data.Senha) {
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


  static async remove(id) {
    const db = await dbModule.connect();
    const { changes } = await db.run(
      'DELETE FROM Estudante WHERE Cod_estudante = ?',
      [id]
    );
   
    if (changes === 0) {
      throw new Error('Estudante não encontrado');
    }
   
    return true;
  }
}


export default Perfil;
