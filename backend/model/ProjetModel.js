// Importation du database.js
const db = require("../config/database");

class Projet {

  // Créer un projet (validé par la commission - contrôle à faire dans le contrôleur)
  static async create(data) {
    const seedData = [
      
  {nomProjet:"Potager pédagogique", description:"Création et entretien d’un potager par les élèves pour apprendre l’écologie et l’agriculture.", dateDebut:"2025-03-01", dateFin:"2025-06-15", valideParCommission:true, statut:"en_cours", idResponsable:1},
  {nomProjet:"Journal du collège", description:"Rédaction d’un journal scolaire par les élèves avec des articles sur la vie du collège.", dateDebut:"2025-01-10", dateFin:"2025-05-30", valideParCommission:true, statut:"en_cours", idResponsable:2},
  {nomProjet:"Club robotique", description:"Initiation à la robotique et programmation avec réalisation de petits robots.", dateDebut:"2025-02-01", dateFin:"2025-06-20", valideParCommission:true, statut:"en_cours", idResponsable:3},
  {nomProjet:"Projet théâtre", description:"Préparation et représentation d’une pièce de théâtre par les élèves.", dateDebut:"2025-01-15", dateFin:"2025-04-30", valideParCommission:true, statut:"termine", idResponsable:4},
  {nomProjet:"Sensibilisation au recyclage", description:"Campagne menée par les élèves pour encourager le tri des déchets dans le collège.", dateDebut:"2025-03-10", dateFin:"2025-05-15", valideParCommission:true, statut:"en_cours", idResponsable:5},
  {nomProjet:"Atelier écriture", description:"Atelier permettant aux élèves de développer leur créativité à travers l’écriture.", dateDebut:"2025-02-10", dateFin:"2025-05-25", valideParCommission:true, statut:"en_cours", idResponsable:2},
  {nomProjet:"Semaine des langues", description:"Organisation d’activités culturelles pour découvrir différentes langues et cultures.", dateDebut:"2025-04-07", dateFin:"2025-04-11", valideParCommission: false, statut:"propose", idResponsable:3},
  {nomProjet:"Tournoi sportif interclasses", description:"Organisation d’un tournoi sportif entre les différentes classes du collège.", dateDebut:"2025-05-01", dateFin:"2025-06-10", valideParCommission:true, statut:"en_cours", idResponsable:4}
];









    const sql = `
      INSERT INTO projets
      (nomProjet, description, dateDebut, dateFin, valideParCommission, statut, idResponsable)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    for (const sql of seedData) {
    await db.execute(sql, [
      data.nomProjet,
      data.description,
      data.dateDebut,
      data.dateFin,
      data.valideParCommission,
      data.statut,
      data.idResponsable
    ]);
  }

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
      SET nomProjet = ?, description = ?, dateDebut = ?, dateFin = ?, statut = ?, valideParCommission = ? 
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
      WHERE idProjet = ? AND idEleve = ? AND idProfesseur = ?
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
      "DELETE FROM ParticipationProjet WHERE idProjet = ? AND idEleve = ? AND idProfesseur = ?",
      [idProjet, idEleve, idProfesseur]
    );
  }

}



module.exports = Projet;
