// Importation du modèle Professeur
const Professeur = require("../model/ProfesseurModel");

class ProfesseurController {

  // Créer un professeur
  static async create(req, res) {
    try {

      const insertId = await Professeur.create(req.body);

      res.status(201).json({
        message: "Professeur créé avec succès",
        id: insertId
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création du professeur",
        erreur: error.message
      });
    }
  }

  // Récupérer tous les professeurs
  static async findAll(req, res) {
    try {

      const professeurs = await Professeur.findAll();

      res.status(200).json(professeurs);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des professeurs",
        erreur: error.message
      });
    }
  }

  // Trouver un professeur par id
  static async findById(req, res) {
    try {

      const professeur = await Professeur.findById(req.params.id);

      // Vérifier si le professeur existe
      if (!professeur) {
        return res.status(404).json({
          message: "Professeur introuvable"
        });
      }

      res.status(200).json(professeur);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération du professeur",
        erreur: error.message
      });
    }
  }

  // Mettre à jour un professeur
  static async update(req, res) {
    try {

      const professeur = await Professeur.findById(req.params.id);

      // Vérifier si le professeur existe
      if (!professeur) {
        return res.status(404).json({
          message: "Professeur introuvable"
        });
      }

      await Professeur.update(req.params.id, req.body);

      res.status(200).json({
        message: "Professeur mis à jour avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour du professeur",
        erreur: error.message
      });
    }
  }

  // Supprimer un professeur
  static async delete(req, res) {
    try {

      const professeur = await Professeur.findById(req.params.id);

      // Vérifier si le professeur existe
      if (!professeur) {
        return res.status(404).json({
          message: "Professeur introuvable"
        });
      }

      await Professeur.delete(req.params.id);

      res.status(200).json({
        message: "Professeur supprimé avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression du professeur",
        erreur: error.message
      });
    }
  }

}

module.exports = ProfesseurController;