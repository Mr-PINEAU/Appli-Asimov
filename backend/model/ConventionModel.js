// Importation du database.js
const db = require("../config/database");

class Convention {

  // Créer une convention
  static async create(data) {

      const seedData = [
    {idStage: 1, entreprise:"SARL Yannick TOTA", tuteur:"Albert", date_debut:"2025-05-25", date_fin:"2025-06-24", signature:true},
    {idStage: 3, entreprise:"Alma", tuteur:"Benoît", date_debut:"2025-01-20", date_fin:"2025-02-20", signature:true},
    {idStage: 2, entreprise:"Wizbii", tuteur:"Albert", date_debut:"2025-03-02", date_fin:"2025-04-04", signature:true},
    {idStage: 4, entreprise:"Thales", tuteur:"Marie", date_debut:"2025-01-11", date_fin:"2025-02-10", signature:true},
    {idStage: 2, entreprise:"Hardis-Group", tuteur:"Michel", date_debut:"2025-11-01", date_fin:"2025-12-02", signature:true},
    {idStage: 1, entreprise:"Economecom", tuteur:"Pierre", date_debut:"2025-02-01", date_fin:"2025-03-02", signature:true},

  ];

    const sql = `
      INSERT INTO Convention
      (idStage, entreprise, tuteur, date_debut, date_fin, signature)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    for (const sql of seedData) {
      await db.execute(sql, [
      data.idStage,
      data.entreprise,
      data.tuteur,
      data.date_debut,
      data.date_fin,
      data.signature
    ]);
  }

    return result.insertId;
  }

  // Récupérer toutes les conventions
  static async findAll() {

    const [rows] = await db.execute(
      "SELECT * FROM Convention"
    );

    return rows;
  }

  // Trouver une convention par id
  static async findById(idConvention) {

    const [rows] = await db.execute(
      "SELECT * FROM Convention WHERE idConvention = ?",
      [idConvention]
    );

    return rows[0];
  }

  // Trouver la convention d'un stage
  static async findByStage(idStage) {

    const [rows] = await db.execute(
      "SELECT * FROM Convention WHERE idStage = ?",
      [idStage]
    );

    return rows[0];
  }

  // Valider une convention par l'enseignant référent (contrôle du rôle à faire dans le contrôleur)
  static async validerConvention(idConvention) {

    const sql = `
      UPDATE Convention
      SET signature = true
      WHERE idConvention = ?
    `;

    await db.execute(sql, [idConvention]);
  }

  // Mettre à jour une convention (réservé à l'élève avant signature - contrôle à faire dans le contrôleur)
  static async update(idConvention, data) {

    const sql = `
      UPDATE Convention
      SET entreprise = ?, tuteur = ?, date_debut = ?, date_fin = ?, signature = ?
      WHERE idConvention = ?
    `;

    await db.execute(sql, [
      data.entreprise,
      data.tuteur,
      data.date_debut,
      data.date_fin,
      data.signature,
      idConvention
    ]);
  }

  // Supprimer une convention
  static async delete(idConvention) {

    await db.execute(
      "DELETE FROM Convention WHERE idConvention = ?",
      [idConvention]
    );
  }

}

module.exports = Convention;