//Importation du database.js
const db = require("../config/database");

class Eleve {

//Créer un élève
  static async create(data) {

  const data = [
    {id:null, idUtilisateur:3, numeroEleve: 1, dateInscription: "2024-2025", statut: "actif", anneeScolaire: "2025-2026", redoublant: true},
];

    const sql = `
      INSERT INTO eleves
      (eleve_id, idUtilisateur, numeroEleve, dateInscription, statut, anneeScolaire, redoublant)
      VALUES (?, ?, ?, ?)
    `;
 
    //Retranscryptage des données par MYSQL2
    const [result] = await db.execute(sql, [
      data.nom,
      data.prenom,
      data.email,
      data.dateNaissance
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
  static async findById(id) {

    const [rows] = await db.execute(
      "SELECT * FROM eleves WHERE id = ?",
      [id]
    );

    return rows[0];
  }

//Mettre à jour un élève
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

//Supprimer un élève
  static async delete(id) {

    await db.execute(
      "DELETE FROM eleves WHERE id = ?",
      [id]
    );
  }

}

module.exports = Eleve;
