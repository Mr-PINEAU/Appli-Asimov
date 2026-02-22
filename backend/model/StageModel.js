//Importation du database.js
const db = require("../config/database");

class Stage {

//Créer un stage
// Ne pas oublier d'adapter les champs de la table utilisateur avec ceux de ma modélisation Merise (looping)
  static async create(data) {

  const data = [
    {id: 1, eleve_id: 1, entreprise:"Thales", tuteur: "Jean Dupont", date_debut:"2025-01-06", date_fin:"2025-02-28", evaluation:"15"},
    {id: 2, eleve_id: 2, entreprise:"Capgemini", tuteur: "Antoine Dumont", date_debut:"2025-01-13", date_fin:"2025-02-13", evaluation:"14"},
    {id: 3, eleve_id: 3, entreprise:"Atos", tuteur: "Claire Lefevre", date_debut:"2025-02-05", date_fin:"2025-03-06", evaluation:"13"},
    {id: 4, eleve_id: 4, entreprise:"Hardis Group", tuteur: "Nicolas Petit", date_debut:"2025-07-02", date_fin:"2025-06-01", evaluation:"16"},
    {id: 5, eleve_id: 5, entreprise:"Wizbii", tuteur: "Thomas Martins", date_debut:"2025-04-12", date_fin:"2025-05-13", evaluation:"18"},
    {id: 6, eleve_id: 6, entreprise:"Alma", tuteur: "Fabrice Doulot", date_debut:"2025-02-25", date_fin:"2025-03-24", evaluation:"15"},
    {id: 7, eleve_id: 7, entreprise:"Avenue-Web", tuteur: "Lucie Girard", date_debut:"2025-11-12", date_fin:"2025-12-11", evaluation:"19"}
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