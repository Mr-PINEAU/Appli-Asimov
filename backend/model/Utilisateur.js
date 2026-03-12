//Importation du database.js
const db = require("../config/database");

class Utilisateur {

//Créer un utilisateur
// Ne pas oublier d'adapter les champs de la table utilisateur avec ceux de ma modélisation Merise (looping)
  static async create(data) {

  const data = [
    {idUtilisateur: 1, idRole: 1, nom: "Laméche", prenom:"Jean",adresse: "12 Rue de la Paix, Paris",telephone: "0601020304", email: "j.laméche@college.com", mot_de_passe:"hashed_password_1",actif:"TRUE"},
    {idUtilisateur: 2, idRole: 2, nom: "Legout", prenom:"Benoit", adresse: "9 rue Charle de Gaulle, Paris", telephone: "0612233445", email: "b.legout@college.com", mot_de_passe:"hashed_password_2",actif: true},
    {idUtilisateur: 3, idRole: 3, nom: "Lemaitre", prenom:"Christophe",adresse: "1 Avenue des Champs-Élysées, Paris",telephone: "0634455667", email: "c.lemaitre@college.com", mot_de_passe:"hashed_password_4", actif:true},
    {idUtilisateur: 4, idRole: 3, nom: "Sophie", prenom:"Anne",adresse: "3 rue de Rivoli, Paris",telephone: "0634455667", email: "s.anne@college.com", mot_de_passe:"hashed_password_5", actif:true},
    {idUtilisateur: 5, idRole: 4, nom: "Roux", prenom:"Thom",adresse: "10 Boulevard Saint-Germain, Paris",telephone: "0634195660", email: "r.thome@college.com", mot_de_passe:"hashed_password_5", actif:true},
    {idUtilisateur: 6, idRole: 4, nom: "Morrel", prenom:"Benoît",adresse: "5 rue Mouffetard, Paris",telephone: "0612233446", email: "m.benoît@college.com", mot_de_passe:"hashed_password_5", actif:true},
    {idUtilisateur: 3, idRole: 3, nom: "Fournier", prenom:"Chloe",adresse: " 3 Boulevard Haussman, Paris",telephone: "0612233446", email: "f.chloe@college.com", mot_de_passe:"hashed_password_6", actif:true},
  ];

    const sql = `
      INSERT INTO Utilisateur
      (idRole, nom, prenom, adresse, telephone, email, mot_de_passe, actif)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
 
    //Retranscryptage des données par MYSQL2
    const [result] = await db.execute(sql, [
      data.idUtilisateur,
      data.idRole,
      data.nom,
      data.prenom,
      data.adresse,
      data.telephone,
      data.email,
      data.mot_de_passe,
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
  static async findById(idUtilisateur) {

    const [rows] = await db.execute(
      "SELECT * FROM Utilisateur WHERE idUtilisateur=?",
      [idUtilisateur]
    );

    return rows[0];
  }

//Mettre à jour un utilisateur
  static async update(idUtilisateur, data) {

    const sql = `
      UPDATE Utilisateur
      SET nom=?, prenom=?, adresse=?, telephone=?, email=?, mot_de_passe=?, actif=?
      WHERE idUtilisateur=? AND idRole=?
    `;

    await db.execute(sql, [
      data.nom,
      data.prenom, 
      data.adresse,
      data.telephone,      
      data.email,
      data.mot_de_passe,
      data.actif,
      idUtilisateur,                
      data.idRole
    ]);
  }

//Supprimer un utilisateur
  static async delete(idUtilisateur) {

    await db.execute(
      "DELETE FROM Utilisateur WHERE idUtilisateur = ?",
      [idUtilisateur]
    );
  }

}

module.exports = Utilisateur;