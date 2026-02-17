//Importation du database.js
const db = require("../config/database");

class Professeur {

//Créer un professeur
  static async create(data) {
 
  // Jeu de données
  const data = [
  { id: 1, nom: "Martin", prenom: Sophie, email: "sophie.martin@ecole.fr", date_naissance: "1978-03-14" },
  { id: 2, nom: "Bernard", prenom: "Luc", email: "luc.bernard@ecole.fr", date_naissance: "1982-07-22" },
  { id: 3, nom: "Dupont", prenom: "Claire", email: "claire.dupont@ecole.fr", date_naissance: "1975-11-05" },
  { id: 4, nom: "Leroy", prenom: "Julien", email: "julien.leroy@ecole.fr", date_naissance: "1990-01-30" },
  { id: 5, nom: "Moreau", prenom: "Isabelle", email: "isabelle.moreau@ecole.fr", date_naissance: "1968-09-17" },
  { id: 6, nom: "Simon", prenom: "Thomas", email: "thomas.simon@ecole.fr", date_naissance: "1985-04-08" },
  { id: 7, nom: "Laurent", prenom: "Marie", email: "marie.laurent@ecole.fr", date_naissance: "1979-12-25" },
  { id: 8, nom: "Lefebvre", prenom: "Nicolas", email: "nicolas.lefebvre@ecole.fr", date_naissance: "1993-06-11" },
  { id: 9, nom: "Michel", prenom: "Aurélie", email: "aurelie.michel@ecole.fr", date_naissance: "1971-08-03" },
  { id: 10, nom: "Garcia", prenom: "Pierre", email: "pierre.garcia@ecole.fr", date_naissance: "1987-02-19" }
]

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

// Récupérer tous les professeurs
  static async findAll() {

    const [rows] = await db.execute(
      "SELECT * FROM Professeur"
    );

    return rows;
  }

// Trouver les professeurs par id
  static async findById(id) {

    const [rows] = await db.execute(
      "SELECT * FROM Professeur WHERE id = ?",
      [id]
    );

    return rows[0];
  }

//Mettre à jour un professeur
  static async update(id, data) {

    const sql = `
      UPDATE Professeur
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

//Supprimer un professeur
  static async delete(id) {

    await db.execute(
      "DELETE FROM professeurs WHERE id = ?",
      [id]
    );
  }

}

module.exports = Professeur;