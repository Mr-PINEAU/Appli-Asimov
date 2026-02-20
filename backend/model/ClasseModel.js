//Importation du database.js
const db = require("../config/database");

class Classe {

//Créer une Classe
  static async create(data) {

  const data = [
    {id_classe: 1, nom_classe: "6A", niveau:"6ème", annee_scolaire: "2025-2026", capacite_max:30, id_prof_principal:2, date_creation: "2025-08-20" },
    {id_classe: 2, nom_classe: "4A", niveau:"4ème", annee_scolaire: "2025-2026", capacite_max:32, id_prof_principal:1, date_creation: "2024-07-24" },
    {id_classe: 3, nom_classe: "3C", niveau:"3ème", annee_scolaire: "2025-2026", capacite_max:29},
    {id_classe: 4, nom_classe: "6B", niveau:"6ème", annee_scolaire: "2025-2026", capacite_max:31},

];

    const sql = `
      INSERT INTO eleves
      (id, nom-classe , niveau, annee_scolaire, capacite_max, id_prof_principal, date_creation)
      VALUES (?, ?, ?, ?, ?, ?, ?)
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