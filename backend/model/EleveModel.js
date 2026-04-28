//Importation du database.js
const db = require("../config/database");

class Eleve {

  //Créer un élève
  static async create(data) {

    const sql = `
      INSERT INTO eleves
      (idUtilisateur, idClasse, numeroEleve, dateInscription, statut, anneeScolaire, redoublant)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    //Retranscryptage des données par MYSQL2
    const [result] = await db.execute(sql, [
      data.idUtilisateur,
      data.idClasse,
      data.numeroEleve,
      data.dateInscription,
      data.statut,
      data.anneeScolaire,
      data.redoublant
    ]);
  

    return result.insertId;
  }

  // Récupérer tous les élèves
  static async findAll() {

    const [rows] = await db.execute(
      "SELECT * FROM eleves"
    );

    return rows;
  }

  // Trouver les élèves par id
  static async findById(idEleve) {

    const [rows] = await db.execute(
      "SELECT * FROM eleves WHERE idEleve = ?",
      [idEleve]
    );

    return rows[0];
  }

  //Mettre à jour un élève
  static async update(idEleve, data) {

    const sql = `
      UPDATE eleves
      SET numeroEleve=?, dateInscription=?, statut=?, anneeScolaire=?, redoublant=?
      WHERE idEleve=? AND idUtilisateur=? AND idClasse=?
    `;

    await db.execute(sql, [
      data.numeroEleve,
      data.dateInscription,
      data.statut,
      data.anneeScolaire,
      data.redoublant,
      idEleve,
      data.idUtilisateur,
      data.idClasse
    ]);
  }

  //Supprimer un élève
  static async delete(idEleve) {

    await db.execute(
      "DELETE FROM eleves WHERE idEleve = ?",
      [idEleve]
    );
  }

}

module.exports = Eleve;