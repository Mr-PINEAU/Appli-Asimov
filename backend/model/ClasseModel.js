//Importation du database.js
const db = require("../config/database");

class Classe {

//Créer une Classe
  static async create(data) {

    const seedData = [
      { niveau: 6, libelle: "6ème A" },
      { niveau: 6, libelle: "6ème B" },
      { niveau: 7, libelle: "5ème A" },
      { niveau: 7, libelle: "5ème B" },
      { niveau: 8, libelle: "4ème A" },
      { niveau: 8, libelle: "4ème B" },
      { niveau: 9, libelle: "3ème A" },
      { niveau: 9, libelle: "3ème B" },
      { niveau: 9, libelle: "3ème C" },
      { niveau: 8, libelle: "4ème C" }
    ];



    const sql = `
      INSERT INTO Classe
      (niveau, libelle)
      VALUES (?, ?)
    `;
 
    //Retranscryptage des données par MYSQL2
    for (const sql of seedData) {
    await db.execute(sql, [
      data.niveau,
      data.libelle
    ]);
  }

    return result.insertId;
  }

// Récupérer tous les classses
  static async findAll() {

    const [rows] = await db.execute(
      "SELECT * FROM Classe"
    );

    return rows;
  }

// Trouver une classse par id
  static async findById(id_classe) {

    const [rows] = await db.execute(
      "SELECT * FROM Classe WHERE id_classe = ?",
      [id_classe]
    );

    return rows[0];
  }

//Mettre à jour une classe
  static async update(id_classe, data) {

    const sql = `
      UPDATE Classe
      SET niveau=?, libelle=?
      WHERE id_classe=? 
    `;

    await db.execute(sql, [
      data.niveau,
      data.libelle,
      id_classe
    ]);
  }

//Supprimer une classe
  static async delete(id_classe) {

    await db.execute(
      "DELETE FROM Classe WHERE id_classe = ?",
      [id_classe]
    );
  }

}

module.exports = Classe;