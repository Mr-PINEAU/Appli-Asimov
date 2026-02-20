//Importation du database.js
const db = require("../config/database");

class Classe {

//Créer une Classe
  static async create(data) {

  const data = [
    {id_classe: 1, nom_classe: "6A", niveau:"6ème", annee_scolaire: "2025-2026", capacite_max:30, id_prof_principal:2, date_creation: "2025-08-20" },
    {id_classe: 2, nom_classe: "4A", niveau:"4ème", annee_scolaire: "2025-2026", capacite_max:32, id_prof_principal:1, date_creation: "2024-07-24e" },
    {id_classe: 3, nom_classe: "3C", niveau:"3ème", annee_scolaire: "2025-2026", capacite_max:29,  id_prof_principal:3, date_creation: "2025-09-15"},
    {id_classe: 4, nom_classe: "6B", niveau:"6ème", annee_scolaire: "2025-2026", capacite_max:31,  id_prof_principal:1, date_creation: "2025-08-20"},
    {id_classe: 5, nom_classe: "4D", niveau:"4ème", annee_scolaire: "2025-2026", capacite_max:30,  id_prof_principal:1, date_creation: "2025-08-24"},
    {id_classe: 6, nom_classe: "5A", niveau:"5ème", annee_scolaire: "2025-2026", capacite_max:28,  id_prof_principal:4, date_creation: "2025-09-05"},
  ];

    const sql = `
      INSERT INTO Classe
      (id, nom-classe , niveau, annee_scolaire, capacite_max, id_prof_principal, date_creation)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
 
    //Retranscryptage des données par MYSQL2
    const [result] = await db.execute(sql, [
      data.id_classe,
      data.nom_classe,
      data.niveau,
      data.annee_scolaire,
      data.capacite_max,
      data.id_prof_principal,
      data.date_creation
    ]);

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
  static async findById(id) {

    const [rows] = await db.execute(
      "SELECT * FROM Classe WHERE id_classe = ?",
      [id]
    );

    return rows[0];
  }

//Mettre à jour une classe
  static async update(id, data) {

    const sql = `
      UPDATE Classe
      SET nom_classe=?, niveau=?, annee_scolaire=?, capacite_max=?, id_prof_prinicipale=?, date_creation=?
      WHERE id_classe=?
    `;

    await db.execute(sql, [
      data.id_classe,
      data.nom_classe,
      data.niveau,
      data.annee_scolaire,
      data.capacite_max,
      data.id_prof_principal,
      data.date_creation,
      id
    ]);
  }

//Supprimer une classe
  static async delete(id) {

    await db.execute(
      "DELETE FROM Classe WHERE id_classe = ?",
      [id]
    );
  }

}

module.exports = Classe;