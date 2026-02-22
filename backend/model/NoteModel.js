//Importation du database.js
const db = require("../config/database");

class Note {

//Créer une Note
// Ne pas oublier d'adapter les champs de la table utilisateur avec ceux de ma modélisation Merise (looping)
  static async create(data) {

  const data = [
    {id: 1, eleve_id: 1, matiere: "Mathématiques", note: "15", coefficient: "2", appreciation: "Bon travail, continue ainsi.", date_note: "2025-01-15"},
    {id: 2, eleve_id: 2, matiere: "Anglais", note: "13", coefficient: "2", appreciation: "Des choses à consolider.", date_note: "2025-01-14"},
     {id: 1, eleve_id: 1, matiere: "Mathématiques", note: "15", coefficient: "2", appreciation: "Bon travail, continue ainsi.", date_note: "2025-01-15"},
  ];

    const sql = `
      INSERT INTO Stage
      (id, eleve_id, entreprise, tuteur, date_debut, date_fin, evaluation)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
 
    //Retranscryptage des données par MYSQL2
    const [result] = await db.execute(sql, [
      data.id,
      data.eleve_id,
      data.entreprise,
      data.tuteur,
      data.date_debut,
      data.date_fin,
      data.evaluation
    ]);

    return result.insertId;
  }

// Récupérer tous les stages
  static async findAll() {

    const [rows] = await db.execute(
      "SELECT * FROM Stage"
    );

    return rows;
  }

// Trouver un utilisateur par id
  static async findById(eleve_id) {

    const [rows] = await db.execute(
      "SELECT * FROM Stage WHERE eleve_id"
      [eleve_id]
    );

    return rows[0];
  }

//Mettre à jour un stage
  static async update(id, data) {

    const sql = `
      UPDATE Stage
      SET entreprise=?, tuteur=?, date_debut=?, date_fin=?, evaluation=?
      WHERE id=? 
    `;

    await db.execute(sql, [       
      data.entreprise,
      data.tuteur,
      data.date_debut,              
      data.date_fin,
      data.evaluation,
      id
    ]);
  }

//Supprimer un stage
  static async delete(id) {

    await db.execute(
      "DELETE FROM Stage WHERE id = ?",
      [id]
    );
  }

}

module.exports = Stage;