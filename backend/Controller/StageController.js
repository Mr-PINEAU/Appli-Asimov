// Importation du modèle Stage
const Stage = require("../model/StageModel");

class StageController {

  // Créer un stage
  static async create(req, res) {
    try {

      const insertId = await Stage.create(req.body);

      res.status(201).json({
        message: "Stage créé avec succès",
        idStage: insertId
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création du stage",
        erreur: error.message
      });
    }
  }

  // Récupérer tous les stages
  static async findAll(req, res) {
    try {

      const stages = await Stage.findAll();

      res.status(200).json(stages);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des stages",
        erreur: error.message
      });
    }
  }

  // Trouver un stage par id
  static async findById(req, res) {
    try {

      const stage = await Stage.findById(req.params.idStage);

      // Vérifier si le stage existe
      if (!stage) {
        return res.status(404).json({
          message: "Stage introuvable"
        });
      }

      res.status(200).json(stage);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération du stage",
        erreur: error.message
      });
    }
  }

  // Mettre à jour un stage
  static async update(req, res) {
    try {

      const stage = await Stage.findById(req.params.idStage);

      // Vérifier si le stage existe
      if (!stage) {
        return res.status(404).json({
          message: "Stage introuvable"
        });
      }

      await Stage.update(req.params.idStage, req.body);

      res.status(200).json({
        message: "Stage mis à jour avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour du stage",
        erreur: error.message
      });
    }
  }

  // Supprimer un stage
  static async delete(req, res) {
    try {

      const stage = await Stage.findById(req.params.idStage);

      // Vérifier si le stage existe
      if (!stage) {
        return res.status(404).json({
          message: "Stage introuvable"
        });
      }

      await Stage.delete(req.params.idStage);

      res.status(200).json({
        message: "Stage supprimé avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression du stage",
        erreur: error.message
      });
    }
  }

}

module.exports = StageController;