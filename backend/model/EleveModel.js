//Importation du database.js
const db = require("../config/database");

class Eleve {

  //Créer un élève
  static async create(data) {

  const data = [
    {idUtilisateur: 1, idClasse: 2, numeroEleve:"ELV-2024-001", dateInscription: "2024-09-02", statut: "Actif", anneeScolaire: "2024/2025", redoublant: false},
    {idUtilisateur: 3, idClasse:3, numeroEleve:"ELV-2024-002", dateInscription: "2024-09-02", statut: "Actif",  anneeScolaire: "2024/2025", redoublant: true},
    {idUtilisateur: 2, idClasse: 1, numeroEleve:"ELV-2024-003", dateInscription: "2024-09-02", statut: "Actif", anneeScolaire: "2024/2025", redoublant: true},
    {idUtilisateur: 4, idClasse:4, numeroEleve:"ELV-2024-004", dateInscription: "2024-09-02", statut: "Suspendu",  anneeScolaire: "2024/2025", redoublant: false},
    {idUtilisateur: 2, idClasse: 4, numeroEleve:"ELV-2024-005", dateInscription: "2024-09-02", statut: "Actif", anneeScolaire: "2024/2025", redoublant: false},
    {idUtilisateur: 1, idClasse: 5, numeroEleve:"ELV-2024-006", dateInscription: "2024-09-02", statut: "Transféré", anneeScolaire: "2024/2025", redoublant: false},

  ];

    const sql = `
      INSERT INTO eleves
      (idUtilisateur, idClasse, numeroEleve, dateInscription, statut, anneeScolaire, redoublant)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    //Retranscryptage des données par MYSQL2
    const [result] = await db.execute(sql, [
      data.idUtilisateur,
      data.idClasse,
      data.numeroEleve,
      data.dateInscription,
      data.statut,
      data.anneeScolaire,
      data.redoublant
    ]);

    return result.insertId;
  }

  // Récupérer tous les élèves
  static async findAll() {

    const [rows] = await db.execute(
      "SELECT * FROM eleves"
    );

    return rows;
  }

  // Trouver les élèves par id
  static async findById(idEleve) {

    const [rows] = await db.execute(
      "SELECT * FROM eleves WHERE idEleve = ?",
      [idEleve]
    );

    return rows[0];
  }

  //Mettre à jour un élève
  static async update(idEleve, data) {

    const sql = `
      UPDATE eleves
      SET numeroEleve=?, dateInscription=?, statut=?, anneeScolaire=?, redoublant=?
      WHERE idEleve=? AND idUtilisateur=? AND idClasse=?
    `;

    await db.execute(sql, [
      data.numeroEleve,
      data.dateInscription,
      data.statut,
      data.anneeScolaire,
      data.redoublant,
      idEleve,
      data.idUtilisateur,
      data.idClasse
    ]);
  }

  //Supprimer un élève
  static async delete(idEleve) {

    await db.execute(
      "DELETE FROM eleves WHERE idEleve = ?",
      [idEleve]
    );
  }

}

module.exports = Eleve;