// Importation du database.js
const db = require("../config/database");

class Projet {

  // Créer un projet (validé par la commission - contrôle à faire dans le contrôleur)
  static async create(data) {

    const sql = `
      INSERT INTO projets
      (nomProjet, description, dateDebut, dateFin, valideParCommission, statut, idResponsable)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      data.nomProjet,
      data.description,
      data.dateDebut,
      data.dateFin,
      data.valideParCommission,
      data.statut,
      data.idResponsable
    ]);

    return result.insertId;
  }

  // Récupérer tous les projets
  static async findAll() {

    const [rows] = await db.execute(
      "SELECT * FROM Projet"
    );

    return rows;
  }

  // Trouver un projet par id
  static async findById(idProjet) {

    const [rows] = await db.execute(
      "SELECT * FROM Projet WHERE idProjet = ?",
      [idProjet]
    );

    return rows[0];
  }

  // Trouver tous les projets dont un élève est responsable
  static async findByResponsable(idEleve) {

    const [rows] = await db.execute(
      "SELECT * FROM Projet WHERE idResponsable = ?",
      [idEleve]
    );

    return rows;
  }

  // Trouver tous les projets auxquels un élève participe
  static async findByParticipant(idEleve) {

    const [rows] = await db.execute(
      `SELECT p.*, pp.dateDebutParticipation, pp.dateFinParticipation
       FROM projets p
       JOIN participations_projets pp ON p.idProjet = pp.idProjet
       WHERE pp.idEleve = ?
       ORDER BY pp.dateDebutParticipation DESC`,
      [idEleve]
    );

    return rows;
  }

  // Mettre à jour un projet
  static async update(idProjet, data) {

    const sql = `
      UPDATE projets
      SET nomProjet = ?, description = ?, dateDebut = ?, dateFin = ?, statut = ?, valideParCommission = ?, 
      WHERE idProjet = ? AND idResponsable = ?
    `;

    await db.execute(sql, [
      data.nomProjet,
      data.description,
      data.dateDebut,
      data.dateFin,
      data.statut,
      data.valideParCommission,
      data.idResponsable,
      idProjet
    ]);
  }

  // Valider un projet par la commission
  static async validerProjet(idProjet) {

    const sql = `
      UPDATE projets
      SET valideParCommission = true, statut = 'Validé'
      WHERE idProjet = ?
    `;

    await db.execute(sql, [idProjet]);
  }

  // Supprimer un projet
  static async delete(idProjet) {

    await db.execute(
      "DELETE FROM Projet WHERE idProjet = ?",
      [idProjet]
    );
  }


  // -------------------------------------------------------
  //  Gestion des participations (table de liaison)
  // -------------------------------------------------------

  // Ajouter un élève à un projet
  static async addParticipant(idProjet, idEleve, idProfesseur, date_Debut) {

    const sql = `
      INSERT INTO participations_projets
      (idProjet, idEleve, idProfesseur, date_Debut)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      idProjet,
      idEleve,
      idProfesseur,
      date_Debut 
    
    ]);

    return result.insertId;
  }

  // Clôturer la participation d'un élève à un projet (enregistrement de la date de fin)
  static async closeParticipant(idProjet, idEleve, idProfesseur, date_Fin) {

    const sql = `
      UPDATE ParticipationsProjet
      SET date_Fin = ?
      WHERE idProjet = ? AND idEleve = ? AND idProfesseur
    `;

    await db.execute(sql, [
      date_Fin,
      idProjet,
      idEleve,
      idProfesseur
    ]);
  }

  // Récupérer tous les participants d'un projet
  static async findParticipants(idProjet) {

    const [rows] = await db.execute(
      `SELECT e.*, u.nom, u.prenom, pp.date_Debut, pp.date_Fin
       FROM  ParticipationProjet pp
       JOIN eleves e ON pp.idEleve = e.idEleve
       JOIN utilisateurs u ON e.idUtilisateur = u.idUtilisateur
       JOIN utilisateurs u_prof  ON p.idUtilisateur = u_prof.idUtilisateur
       WHERE pp.idProjet = ?`,
      [idProjet]
    );

    return rows;
  }

  // Retirer un élève ou un professeur d'un projet
  static async removeParticipant(idProjet, idEleve, idProfesseur) {

    await db.execute(
      "DELETE FROM ParticipationProjet WHERE idProjet = ? AND idEleve = ?",
      [idProjet, idEleve, idProfesseur]
    );
  }

}



module.exports = Projet;
