// Importation du database.js
const db = require("../config/database");

class HistoriqueClasse {

  // Créer un historique de classe pour un élève
  static async create(data) {

    const sql = `
      INSERT INTO historique_classes
      (idEleve, idClasse, anneeScolaire, semestre, moyenneGenerale, dateDebut, dateFin, statut)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      data.idEleve,
      data.idClasse,
      data.anneeScolaire,
      data.semestre,
      data.moyenneGenerale,
      data.dateDebut,
      data.dateFin,
      data.statut
    ]);

    return result.insertId;
  }

  // Récupérer tout l'historique
  static async findAll() {

    const [rows] = await db.execute(
      "SELECT * FROM historique_classes"
    );

    return rows;
  }

  // Trouver un historique par id
  static async findById(idHistorique) {

    const [rows] = await db.execute(
      "SELECT * FROM historique_classes WHERE idHistorique = ?",
      [idHistorique]
    );

    return rows[0];
  }

  // Trouver tout l'historique d'un élève (toutes ses classes passées)
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
       FROM historique_classes
       WHERE idEleve = ?
       ORDER BY anneeScolaire ASC, semestre ASC`,
      [idEleve]
    );

    return rows;
  }

  // Mettre à jour la moyenne (réservé au proviseur uniquement - contrôle à faire dans le contrôleur)
  static async updateMoyenne(idHistorique, moyenneGenerale) {

    const sql = `
      UPDATE historique_classes
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
      UPDATE historique_classes
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
      "DELETE FROM historique_classes WHERE idHistorique = ?",
      [idHistorique]
    );
  }

}

module.exports = HistoriqueClasse;