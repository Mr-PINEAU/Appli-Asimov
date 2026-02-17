//Importation du database.js
const db = require("../config/database");

class Eleve {

//Créer un élève
  static async create(data) {

  const data = [
    { id:1 , name: 'Dupont', firstname :'Alice', email: 'alice@dupont.com', date_naissance : '12/02/2004' },
    { id:2 , name: 'Bob', firstname :'Léponge' , email: 'bob@léponge.com', date_naissance : '31/05/2006' },
    { id:3 , name: 'Nordine', firstname :'Ateure' , email: 'nordine@ateure.com', date_naissance : '01/10/2003' } ,
    { id:4 , name: 'Romain', firstname :'Loucot' , email: 'romain@loucot.com', date_naissance : '17/12/2004'} ,
    { id:5 , name: 'Elisa', firstname :'Levaloit' , email: 'elisa@levaloit.com', date_naissance : '18/07/2004'}
];

    const sql = `
      INSERT INTO eleves
      (nom, prenom, email, date_naissance)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      data.nom,
      data.prenom,
      data.email,
      data.dateNaissance
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
  static async findById(id) {

    const [rows] = await db.execute(
      "SELECT * FROM eleves WHERE id = ?",
      [id]
    );

    return rows[0];
  }

//Mettre à jour un élève
  static async update(id, data) {

    const sql = `
      UPDATE eleves
      SET nom=?, prenom=?, email=?, date_naissance=?
      WHERE id=?
    `;

    await db.execute(sql, [
      data.nom,
      data.prenom,
      data.email,
      data.dateNaissance,
      id
    ]);
  }

//Supprimer un élève
  static async delete(id) {

    await db.execute(
      "DELETE FROM eleves WHERE id = ?",
      [id]
    );
  }

}

module.exports = Eleve;
