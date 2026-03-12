// Importation du modèle Convention
const Convention = require("../model/ConventionModel");

class ConventionController {

  // Créer une convention (réservé à l'élève - contrôle du rôle à faire dans le middleware)
  static async create(req, res) {
    try {

      const insertId = await Convention.create(req.body);

      res.status(201).json({
        message: "Convention créée avec succès",
        idConvention: insertId
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création de la convention",
        erreur: error.message
      });
    }
  }

  // Récupérer toutes les conventions
  static async findAll(req, res) {
    try {

      const conventions = await Convention.findAll();

      res.status(200).json(conventions);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des conventions",
        erreur: error.message
      });
    }
  }

  // Trouver une convention par id
  static async findById(req, res) {
    try {

      const convention = await Convention.findById(req.params.idConvention);

      // Vérifier si la convention existe
      if (!convention) {
        return res.status(404).json({
          message: "Convention introuvable"
        });
      }

      res.status(200).json(convention);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération de la convention",
        erreur: error.message
      });
    }
  }

  // Trouver la convention d'un stage
  static async findByStage(req, res) {
    try {

      const convention = await Convention.findByStage(req.params.idStage);

      // Vérifier si la convention existe
      if (!convention) {
        return res.status(404).json({
          message: "Aucune convention trouvée pour ce stage"
        });
      }

      res.status(200).json(convention);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération de la convention du stage",
        erreur: error.message
      });
    }
  }

  // Valider une convention par l'enseignant référent (contrôle du rôle à faire dans le middleware)
  static async validerConvention(req, res) {
    try {

      const convention = await Convention.findById(req.params.idConvention);

      // Vérifier si la convention existe
      if (!convention) {
        return res.status(404).json({
          message: "Convention introuvable"
        });
      }

      // Vérifier que la convention n'est pas déjà signée
      if (convention.signature) {
        return res.status(400).json({
          message: "Cette convention est déjà validée et signée"
        });
      }

      await Convention.validerConvention(req.params.idConvention);

      res.status(200).json({
        message: "Convention validée et signée avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la validation de la convention",
        erreur: error.message
      });
    }
  }

  // Mettre à jour une convention (réservé à l'élève avant signature - contrôle du rôle à faire dans le middleware)
  static async update(req, res) {
    try {

      const convention = await Convention.findById(req.params.idConvention);

      // Vérifier si la convention existe
      if (!convention) {
        return res.status(404).json({
          message: "Convention introuvable"
        });
      }

      // Bloquer la modification si la convention est déjà signée
      if (convention.signature) {
        return res.status(403).json({
          message: "Impossible de modifier une convention déjà signée"
        });
      }

      await Convention.update(req.params.idConvention, req.body);

      res.status(200).json({
        message: "Convention mise à jour avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour de la convention",
        erreur: error.message
      });
    }
  }

  // Supprimer une convention
  static async delete(req, res) {
    try {

      const convention = await Convention.findById(req.params.idConvention);

      // Vérifier si la convention existe
      if (!convention) {
        return res.status(404).json({
          message: "Convention introuvable"
        });
      }

      // Bloquer la suppression si la convention est déjà signée
      if (convention.signature) {
        return res.status(403).json({
          message: "Impossible de supprimer une convention déjà signée"
        });
      }

      await Convention.delete(req.params.idConvention);

      res.status(200).json({
        message: "Convention supprimée avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de la convention",
        erreur: error.message
      });
    }
  }

}

module.exports = ConventionController;