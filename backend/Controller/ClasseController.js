// Importation du modèle Classe
const Classe = require("../model/ClasseModel");

class ClasseController {

  // Créer une classe
  static async create(req, res) {
    try {

      const insertId = await Classe.create(req.body);

      res.status(201).json({
        message: "Classe créée avec succès",
        id_classe: insertId
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création de la classe",
        erreur: error.message
      });
    }
  }

  // Récupérer toutes les classes
  static async findAll(req, res) {
    try {

      const classes = await Classe.findAll();

      res.status(200).json(classes);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des classes",
        erreur: error.message
      });
    }
  }

  // Trouver une classe par id
  static async findById(req, res) {
    try {

      const classe = await Classe.findById(req.params.id_classe);

      // Vérifier si la classe existe
      if (!classe) {
        return res.status(404).json({
          message: "Classe introuvable"
        });
      }

      res.status(200).json(classe);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération de la classe",
        erreur: error.message
      });
    }
  }

  // Mettre à jour une classe
  static async update(req, res) {
    try {

      const classe = await Classe.findById(req.params.id_classe);

      // Vérifier si la classe existe
      if (!classe) {
        return res.status(404).json({
          message: "Classe introuvable"
        });
      }

      await Classe.update(req.params.id_classe, req.body);

      res.status(200).json({
        message: "Classe mise à jour avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour de la classe",
        erreur: error.message
      });
    }
  }

  // Supprimer une classe
  static async delete(req, res) {
    try {

      const classe = await Classe.findById(req.params.id_classe);

      // Vérifier si la classe existe
      if (!classe) {
        return res.status(404).json({
          message: "Classe introuvable"
        });
      }

      await Classe.delete(req.params.id_classe);

      res.status(200).json({
        message: "Classe supprimée avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de la classe",
        erreur: error.message
      });
    }
  }

}

module.exports = ClasseController;