const db = require("../config/database");

class Eleve {

  static async create(data) {

    const sql = `
      INSERT INTO eleves
      (nom, prenom, email, date_naissance)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      data.nom,
      data.prenom,
      data.email,
      data.dateNaissance
    ]);

    return result.insertId;
  }


  static async findAll() {

    const [rows] = await db.execute(
      "SELECT * FROM eleves"
    );

    return rows;
  }


  static async findById(id) {

    const [rows] = await db.execute(
      "SELECT * FROM eleves WHERE id = ?",
      [id]
    );

    return rows[0];
  }


  static async update(id, data) {

    const sql = `
      UPDATE eleves
      SET nom=?, prenom=?, email=?, date_naissance=?
      WHERE id=?
    `;

    await db.execute(sql, [
      data.nom,
      data.prenom,
      data.email,
      data.dateNaissance,
      id
    ]);
  }


  static async delete(id) {

    await db.execute(
      "DELETE FROM eleves WHERE id = ?",
      [id]
    );
  }

}

module.exports = Eleve;
