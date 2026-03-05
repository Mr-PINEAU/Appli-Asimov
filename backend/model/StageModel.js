//Importation du database.js
const db = require("../config/database");

class Stage {

//Créer un stage
// Ne pas oublier d'adapter les champs de la table utilisateur avec ceux de ma modélisation Merise (looping)
  static async create(data) {

  const data = [
    {idStage: 1, eleve_id: 1, date_debut:"2025-01-06", date_fin:"2025-02-28", evaluation:"15"},
    {idStage: 2, eleve_id: 2, date_debut:"2025-01-13", date_fin:"2025-02-13", evaluation:"14"},
    {idStage: 3, eleve_id: 3, date_debut:"2025-02-05", date_fin:"2025-03-06", evaluation:"13"},
    {idStage: 4, eleve_id: 4, date_debut:"2025-07-02", date_fin:"2025-06-01", evaluation:"16"},
    {idStage: 5, eleve_id: 5, date_debut:"2025-04-12", date_fin:"2025-05-13", evaluation:"18"},
    {idStage: 6, eleve_id: 6, date_debut:"2025-02-25", date_fin:"2025-03-24", evaluation:"15"},
    {idStage: 7, eleve_id: 7, date_debut:"2025-11-12", date_fin:"2025-12-11", evaluation:"19"}
  ];

    const sql = `
      INSERT INTO Stage
      (eleve_id, date_debut, date_fin, evaluation)
      VALUES (?, ?, ?, ?, ?)
    `;
 
    //Retranscryptage des données par MYSQL2
    const [result] = await db.execute(sql, [
      data.idStage,
      data.eleve_id,
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

// Trouver un stage par id
  static async findById(idStage) {

    const [rows] = await db.execute(
      "SELECT * FROM Stage WHERE idStage"
      [idStage]
    );

    return rows[0];
  }

//Mettre à jour un stage
  static async update(idStage, data) {

    const sql = `
      UPDATE Stage
      SET date_debut=?, date_fin=?, evaluation=?
      WHERE idStage=? AND eleve_id=? 
    `;

    await db.execute(sql, [       
      data.date_debut,              
      data.date_fin,
      data.evaluation,
      idStage,
      data.eleve_id
    ]);
  }

//Supprimer un stage
  static async delete(idStage) {

    await db.execute(
      "DELETE FROM Stage WHERE idStage = ?",
      [idStage]
    );
  }

}

module.exports = Stage;