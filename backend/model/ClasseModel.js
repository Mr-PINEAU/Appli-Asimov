//Importation du database.js
const db = require("../config/database");

class Classe {

//Créer une Classe
  static async create(data) {

  const data = [
    {id_classe: 1, nom_classe: "6A", niveau:"6ème", filiere:"Général", annee_scolaire: "2025-2026", capacite_max:30,}
];

    const sql = `
      INSERT INTO eleves
      (nom, prenom, email, date_naissance)
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