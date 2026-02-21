//Importation du database.js
const db = require("../config/database");

class Utilisateur {

//Créer un utilisateur
// Ne pas oublier d'adapter les champs de la table utilisateur avec ceux de ma modélisation Merise (looping)
  static async create(data) {

  const data = [
    {id: 1, nom: "Laméche", prenom:"Jean", email: "jean@laméche.com", mot_de_passe:"454TR30", id_role:"professeur", actif:"TRUE"},
    {id: 2, nom: "Legout", prenom:"Benoit", email: "benoit@legout.com", mot_de_passe:"benoit1465?", id_role:"admin", actif:"TRUE"},
    {id: 3, nom: "Lemaitre", prenom:"Christophe", email: "christophe@lemaitre.com", mot_de_passe:"christophe12345", id_role:"eleve", actif:"TRUE"},
    {id: 4, nom: "Milas", prenom:"Abra", email: "abra@milas.com", mot_de_passe:"56!lkjmilaaaas", id_role:"professeur", actif:"TRUE"},
    {id: 5, nom: "Nicouse", prenom:"Martine", email: "martine@nicouse.com", mot_de_passe:"1456Nicouse", id_role:"admin", actif:"TRUE"}
  ];

    const sql = `
      INSERT INTO Utilisateur
      (id, nom, prenom, email, mot_de_passe, id_role, actif)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
 
    //Retranscryptage des données par MYSQL2
    const [result] = await db.execute(sql, [
      data.id,
      data.nom,
      data.prenom,
      data.email,
      data.mot_de_passe,
      data.id_role,
      data.actif
    ]);

    return result.insertId;
  }

// Récupérer tous les utilisateurs
  static async findAll() {

    const [rows] = await db.execute(
      "SELECT * FROM Utilisateur"
    );

    return rows;
  }

// Trouver un utilisateur par id
  static async findById(id, id_role) {

    const [rows] = await db.execute(
      "SELECT * FROM Utilisateur WHERE id = ?, id_role = ?"
      [id, id_role]
    );

    return rows[0];
  }

//Mettre à jour un utilisateur
  static async update(id, data) {

    const sql = `
      UPDATE Utilisateur
      SET nom=?, prenom=?, email=?, mot_de_passe=?, actif=?
      WHERE id=? and id_role=?
    `;

    await db.execute(sql, [
      data.nom,
      data.prenom,       
      data.email,
      data.mot_de_passe,
      data.actif,
      id,                
      data.id_role
    ]);
  }

//Supprimer un utilisateur
  static async delete(id) {

    await db.execute(
      "DELETE FROM Utilisateur WHERE id = ?",
      [id]
    );
  }

}

module.exports = Utilisateur;