//Importation du database.js
const db = require("../config/database");

class Eleve {

//Créer un élève
  static async create(data) {

  const data = [
    { idEleve: 1 , idUtilisateur: 10, idClasse: 1, numeroEleve:"ELV-2024-001", dateInscription:"2024-09-02", statut:"Actif", anneeScolaire:"2024/2025", redoublant: false},
    { idEleve: 2 , idUtilisateur: 11, idClasse: 1, numeroEleve:"ELV-2024-002", dateInscription:"2024-09-02", statut:"Actif", anneeScolaire:"2024/2025", redoublant: true},
    { idEleve: 3 , idUtilisateur: 12, idClasse: 2, numeroEleve:"ELV-2024-003", dateInscription:"2024-09-03", statut:"Actif", anneeScolaire:"2024/2025", redoublant: false } ,
    { idEleve: 4 , idUtilisateur: 13, idClasse: 2, numeroEleve:"ELV-2024-004", dateInscription:"2024-09-04", statut:"Suspendue", anneeScolaire:"2024/2025", redoublant: false} ,
    { idEleve: 5 , idUtilisateur: 14, idClasse: 3, numeroEleve:"ELV-2024-005", dateInscription:"2024-09-04", statut:"Actif", anneeScolaire:"2024/2025", redoublant: true},
    { idEleve: 6 , idUtilisateur: 15, idClasse: 3, numeroEleve:"ELV-2024-006", dateInscription:"2024-09-04", statut:"Actif", anneeScolaire:"2024/2025", redoublant: false},
    { idEleve: 7 , idUtilisateur: 16, idClasse: 4, numeroEleve:"ELV-2024-007", dateInscription:"2024-09-05", statut:"Transféré", anneeScolaire:"2023/2024", redoublant: false},
    { idEleve: 8 , idUtilisateur: 17, idClasse: 5,  numeroEleve:"ELV-2024-008", dateInscription:"2024-09-05", statut:"Actif", anneeScolaire:"2024/2025", redoublant: false},
    { idEleve: 9 , idUtilisateur: 18, idClasse: 5, numeroEleve:"ELV-2024-009", dateInscription:"2024-09-06", statut:"Actif", anneeScolaire:"2024/2025", redoublant: true},
    { idEleve: 10 , idUtilisateur: 19, idClasse: 6, numeroEleve:"ELV-2024-010", dateInscription:"2024-09-06", statut:"Exclu", anneeScolaire:"2024/2025", redoublant: false} 
  
  ];

    const sql = `
      INSERT INTO eleves
      (idEleve, idUtilisateur, idClasse, numeroEleve, dateInscription, statut, anneeScolaire, redoublant)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
 
    //Retranscryptage des données par MYSQL2
    const [result] = await db.execute(sql, [
      data.idEleve,
      data.idUtilisateur,
      data.idClasse,
      data.numeroEleve,
      data.dateInscription,
      data.statut,
      data.anneeScolairee,
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
      data.anneeScolairee,
      data.redoublant,
      idEleve,
      idUtilisateur,
      idClasse
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
