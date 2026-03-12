// Importation du modèle Eleve
const Eleve = require("../model/EleveModel");

class EleveController {

  // Créer un élève
  static async create(req, res) {
    try {

      const insertId = await Eleve.create(req.body);

      res.status(201).json({
        message: "Élève créé avec succès",
        idEleve: insertId
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création de l'élève",
        erreur: error.message
      });
    }
  }

  // Récupérer tous les élèves
  static async findAll(req, res) {
    try {

      const eleves = await Eleve.findAll();

      res.status(200).json(eleves);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des élèves",
        erreur: error.message
      });
    }
  }

  // Trouver un élève par id
  static async findById(req, res) {
    try {

      const eleve = await Eleve.findById(req.params.idEleve);

      // Vérifier si l'élève existe
      if (!eleve) {
        return res.status(404).json({
          message: "Élève introuvable"
        });
      }

      res.status(200).json(eleve);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération de l'élève",
        erreur: error.message
      });
    }
  }

  // Mettre à jour un élève
  static async update(req, res) {
    try {

      const eleve = await Eleve.findById(req.params.idEleve);

      // Vérifier si l'élève existe
      if (!eleve) {
        return res.status(404).json({
          message: "Élève introuvable"
        });
      }

      await Eleve.update(req.params.idEleve, req.body);

      res.status(200).json({
        message: "Élève mis à jour avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour de l'élève",
        erreur: error.message
      });
    }
  }

  // Supprimer un élève
  static async delete(req, res) {
    try {

      const eleve = await Eleve.findById(req.params.idEleve);

      // Vérifier si l'élève existe
      if (!eleve) {
        return res.status(404).json({
          message: "Élève introuvable"
        });
      }

      await Eleve.delete(req.params.idEleve);

      res.status(200).json({
        message: "Élève supprimé avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de l'élève",
        erreur: error.message
      });
    }
  }

}

module.exports = EleveController;