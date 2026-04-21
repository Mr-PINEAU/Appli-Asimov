// Importation du database.js
const db = require("../config/database");

class HistoriqueClasse {

  // Créer un historique de classe pour un élève
  static async create(data) {

    const seedData = [
      {idEleve: 1, idClasse: 3, anneeScolaire: "2022-2023", semestre: 1, moyenneGenerale: 14.5, dateDebut: "2022-09-01", dateFin: "2023-01-31", statut: "valide"},
      {idEleve: 2, idClasse: 3, anneeScolaire: "2022-2023", semestre: 1, moyenneGenerale: 12.8, dateDebut: "2022-09-01", dateFin: "2023-01-31", statut: "valide"},
      {idEleve: 3, idClasse: 3, anneeScolaire: "2022-2023", semestre: 1, moyenneGenerale: 9.7, dateDebut: "2022-09-01", dateFin: "2023-01-31", statut: "redouble"},
      {idEleve: 4, idClasse: 4, anneeScolaire: "2022-2023", semestre: 2, moyenneGenerale: 15.3, dateDebut: "2023-02-01", dateFin: "2023-06-30", statut: "valide"},
      {idEleve: 5, idClasse: 4, anneeScolaire: "2022-2023", semestre: 2, moyenneGenerale: 11.6, dateDebut: "2023-02-01", dateFin: "2023-06-30", statut: "valide"},
      {idEleve: 6, idClasse: 4, anneeScolaire: "2022-2023", semestre: 2, moyenneGenerale: 8.9, dateDebut: "2023-02-01", dateFin: "2023-06-30", statut: "redouble"},
      {idEleve: 1, idClasse: 5, anneeScolaire: "2023-2024", semestre: 1, moyenneGenerale: 13.2, dateDebut: "2023-09-01", dateFin: "2024-01-31", statut: "valide"},
      {idEleve: 2, idClasse: 5, anneeScolaire: "2023-2024", semestre: 1, moyenneGenerale: 10.4, dateDebut: "2023-09-01", dateFin: "2024-01-31", statut: "valide"},
      {idEleve: 3, idClasse: 5, anneeScolaire: "2023-2024", semestre: 1, moyenneGenerale: 16.7, dateDebut: "2023-09-01", dateFin: "2024-01-31", statut: "valide"},
      {idEleve: 4, idClasse: 6, anneeScolaire: "2023-2024", semestre: 2, moyenneGenerale: 14.9, dateDebut: "2024-02-01", dateFin: "2024-06-30", statut: "valide"},
      {idEleve: 5, idClasse: 6, anneeScolaire: "2023-2024", semestre: 2, moyenneGenerale: 7.5, dateDebut: "2024-02-01", dateFin: "2024-06-30", statut: "redouble"},
      {idEleve: 6, idClasse: 6, anneeScolaire: "2023-2024", semestre: 2, moyenneGenerale: 12.1, dateDebut: "2024-02-01", dateFin: "2024-06-30", statut: "valide"}
];

    

    const sql = `
      INSERT INTO HistoriqueClasse
      (idEleve, idClasse, anneeScolaire, semestre, moyenneGenerale, dateDebut, dateFin, statut)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (const sql of seedData) {
    await db.execute(sql, [
      data.idEleve,
      data.idClasse,
      data.anneeScolaire,
      data.semestre,
      data.moyenneGenerale,
      data.dateDebut,
      data.dateFin,
      data.statut
    ]);
  }

    return result.insertId;
  }

  // Récupérer tout l'historique
  static async findAll() {

    const [rows] = await db.execute(
      "SELECT * FROM HistoriqueClasse"
    );

    return rows;
  }

  // Trouver un historique par id
  static async findById(idHistorique) {

    const [rows] = await db.execute(
      "SELECT * FROM HistoriqueClasse WHERE idHistorique = ?",
      [idHistorique]
    );

    return rows[0];
  }

  // Trouver tout l'historique d'un élève  - toutes ses classes passées)
  static async findByEleve(idEleve) {

    const [rows] = await db.execute(
      `SELECT hc.*, c.nomClasse, c.niveau
       FROM historique_classes hc
       JOIN classes c ON hc.idClasse = c.idClasse
       WHERE hc.idEleve = ?
       ORDER BY hc.anneeScolaire ASC, hc.semestre ASC`,
      [idEleve]
    );

    return rows;
  }

  // Trouver les moyennes d'un élève par semestre
  static async findMoyennesByEleve(idEleve) {

    const [rows] = await db.execute(
      `SELECT anneeScolaire, semestre, moyenneGenerale
       FROM HistoriqueClasse
       WHERE idEleve = ?
       ORDER BY anneeScolaire ASC, semestre ASC`,
      [idEleve]
    );

    return rows;
  }

  // Mettre à jour la moyenne (réservé au proviseur uniquement - contrôle à faire dans le contrôleur)
  static async updateMoyenne(idHistorique, moyenneGenerale) {

    const sql = `
      UPDATE HistoriqueClasse
      SET moyenneGenerale = ?
      WHERE idHistorique = ?
    `;

    await db.execute(sql, [
      moyenneGenerale,
      idHistorique
    ]);
  }

  // Mettre à jour un historique complet
  static async update(idHistorique, data) {

    const sql = `
      UPDATE HistoriqueClasse
      SET idClasse = ?, anneeScolaire = ?, semestre = ?, moyenneGenerale = ?, dateDebut = ?, dateFin = ?, statut = ?
      WHERE idHistorique = ?
    `;

    await db.execute(sql, [
      data.idClasse,
      data.anneeScolaire,
      data.semestre,
      data.moyenneGenerale,
      data.dateDebut,
      data.dateFin,
      data.statut,
      idHistorique
    ]);
  }

  // Supprimer un historique
  static async delete(idHistorique) {

    await db.execute(
      "DELETE FROM HistoriqueClasse WHERE idHistorique = ?",
      [idHistorique]
    );
  }

}

module.exports = HistoriqueClasse;