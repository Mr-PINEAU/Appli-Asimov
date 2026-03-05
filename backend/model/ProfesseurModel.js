//Importation du database.js
const db = require("../config/database");

class Professeur {

//Créer un professeur
  static async create(data) {
 
  // Jeu de données
  const data = [
  {id: 1, idUtilisateur: 2, matricule:"02134569", specialite:"Mathematique", dateEmbauche:"2022-08-20"},
  {id: 2, idUtilisateur: 1, matricule:"10134469", specialite:"Français", dateEmbauche:"2022-09-20" },
  {id: 3, idUtilisateur: 4, matricule:"14135461", specialite:"Géographie", dateEmbauche:"2021-07-23"},
  {id: 4, idUtilisateur: 3, matricule:"10104964", specialite:"Histoire", dateEmbauche:"2019-03-14"},
  {id: 5, idUtilisateur: 5, matricule:"15534199", specialite:"Anglais", dateEmbauche:"2020-11-23"},
  {id: 6, idUtilisateur: 2, matricule:"810332466", specialite:"Éducation Sportive", dateEmbauche:"2018-04-03"},
  {id: 7, idUtilisateur: 6, matricule:"50145462", specialite:"Espagnol", dateEmbauche:"2016-05-07"},
  {id: 8, idUtilisateur: 1, matricule:"10137610", specialite:"Enseigement Morale Civique", dateEmbauche:"2013-06-22"},
  {id: 9, idUtilisateur: 3, matricule:"12336869", specialite:"Art Plastique", dateEmbauche:"2019-06-23"},
  {id: 10,idUtilisateur: 2,nom: "Garcia", prenom: "Pierre", email: "pierre.garcia@ecole.fr", specialite:"Musique",dateEmbauche:"2023-10-11"}
]

    const sql = `
      INSERT INTO Professeur
      (id, idUtilisateur, matricule, specialite, dateEmbauche)
      VALUES (?, ?, ?, ?, ?)
    `;
 
    //Retranscryptage des données par MYSQL2
    const [result] = await db.execute(sql, [
      id,
      idUtilisateur,
      data.matricule,
      data.specialite,
      data.dateEmbauche
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
      SET matricule=?, specialite=?, dateEmbauche=? 
      WHERE id=?, idUtilisateur=?
    `;

  //Retranscryptage des données par MYSQL2
    await db.execute(sql, [
      id,
      idUtilisateur,
      data.matricule,
      data.specialite,
      data.dateEmbauche
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