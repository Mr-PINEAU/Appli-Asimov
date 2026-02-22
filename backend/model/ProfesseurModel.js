//Importation du database.js
const db = require("../config/database");

class Professeur {

//Créer un professeur
  static async create(data) {
 
  // Jeu de données
  const data = [
  {id: 1, nom: "Martin", prenom: Sophie, email: "sophie.martin@ecole.fr", specialite:"Mathematique"},
  {id: 2, nom: "Bernard", prenom: "Luc", email: "luc.bernard@ecole.fr", specialite:"Français"},
  {id: 3, nom: "Dupont", prenom: "Claire", email: "claire.dupont@ecole.fr", specialite:"Géographie"},
  {id: 4, nom: "Leroy", prenom: "Julien", email: "julien.leroy@ecole.fr", specialite:"Histoire"},
  {id: 5, nom: "Moreau", prenom: "Isabelle", email: "isabelle.moreau@ecole.fr", specialite:"Anglais"},
  {id: 6, nom: "Simon", prenom: "Thomas", email: "thomas.simon@ecole.fr", specialite:"Éducation Sportive"},
  {id: 7, nom: "Laurent", prenom: "Marie", email: "marie.laurent@ecole.fr", specialite:"Espagnol"},
  {id: 8, nom: "Lefebvre", prenom: "Nicolas", email: "nicolas.lefebvre@ecole.fr", specialite:"Enseigement Morale Civique"},
  {id: 9, nom: "Michel", prenom: "Aurélie", email: "aurelie.michel@ecole.fr", specialite:"Art Plastique"},
  {id: 10, nom: "Garcia", prenom: "Pierre", email: "pierre.garcia@ecole.fr", specialite:"Musique"}
]

    const sql = `
      INSERT INTO Professeur
      (nom, prenom, email, specialite)
      VALUES (?, ?, ?, ?, ?)
    `;
 
    //Retranscryptage des données par MYSQL2
    const [result] = await db.execute(sql, [
      data.nom,
      data.prenom,
      data.email,
      data.specialite
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
      SET nom=?, prenom=?, email=?, specialite=?
      WHERE id=?
    `;

  //Retranscryptage des données par MYSQL2
    await db.execute(sql, [
      data.nom,
      data.prenom,
      data.email,
      data.specialite,
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