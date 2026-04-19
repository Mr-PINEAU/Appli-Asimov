//Importation du database.js
const db = require("../config/database");

class Classe {

//Créer une Classe
  static async create(data) {


    const sql = `
      INSERT INTO Classe
      (niveau, libelle)
      VALUES (?, ?)
    `;
 
    //Retranscryptage des données par MYSQL2
    const [result] = await db.execute(sql, [
      data.niveau,
      data.libelle
    ]);

    return result.insertId;
  }

// Récupérer tous les classses
  static async findAll() {

    const [rows] = await db.execute(
      "SELECT * FROM Classe"
    );

    return rows;
  }

// Trouver une classse par id
  static async findById(id_classe) {

    const [rows] = await db.execute(
      "SELECT * FROM Classe WHERE id_classe = ?",
      [id_classe]
    );

    return rows[0];
  }

//Mettre à jour une classe
  static async update(id_classe, data) {

    const sql = `
      UPDATE Classe
      SET niveau=?, libelle=?
      WHERE id_classe=? 
    `;

    await db.execute(sql, [
      data.niveau,
      data.libelle,
      id_classe
    ]);
  }

//Supprimer une classe
  static async delete(id_classe) {

    await db.execute(
      "DELETE FROM Classe WHERE id_classe = ?",
      [id_classe]
    );
  }

}

module.exports = Classe;