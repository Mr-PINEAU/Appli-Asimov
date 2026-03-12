// Importation du modèle HistoriqueClasse
const HistoriqueClasse = require("../model/HistoriqueClasseModel");

class HistoriqueClasseController {

  // Créer un historique (réservé au secrétariat - contrôle du rôle à faire dans le middleware)
  static async create(req, res) {
    try {

      const insertId = await HistoriqueClasse.create(req.body);

      res.status(201).json({
        message: "Historique créé avec succès",
        idHistorique: insertId
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création de l'historique",
        erreur: error.message
      });
    }
  }

  // Récupérer tout l'historique
  static async findAll(req, res) {
    try {

      const historiques = await HistoriqueClasse.findAll();

      res.status(200).json(historiques);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des historiques",
        erreur: error.message
      });
    }
  }

  // Trouver un historique par id
  static async findById(req, res) {
    try {

      const historique = await HistoriqueClasse.findById(req.params.idHistorique);

      // Vérifier si l'historique existe
      if (!historique) {
        return res.status(404).json({
          message: "Historique introuvable"
        });
      }

      res.status(200).json(historique);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération de l'historique",
        erreur: error.message
      });
    }
  }

  // Trouver tout l'historique d'un élève (toutes ses classes passées)
  static async findByEleve(req, res) {
    try {

      const historiques = await HistoriqueClasse.findByEleve(req.params.idEleve);

      res.status(200).json(historiques);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération de l'historique de l'élève",
        erreur: error.message
      });
    }
  }

  // Trouver les moyennes d'un élève par semestre
  static async findMoyennesByEleve(req, res) {
    try {

      const moyennes = await HistoriqueClasse.findMoyennesByEleve(req.params.idEleve);

      res.status(200).json(moyennes);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des moyennes de l'élève",
        erreur: error.message
      });
    }
  }

  // Mettre à jour la moyenne uniquement (réservé au proviseur - contrôle du rôle à faire dans le middleware)
  static async updateMoyenne(req, res) {
    try {

      const historique = await HistoriqueClasse.findById(req.params.idHistorique);

      // Vérifier si l'historique existe
      if (!historique) {
        return res.status(404).json({
          message: "Historique introuvable"
        });
      }

      // Vérifier que la moyenne est bien fournie
      if (req.body.moyenneGenerale === undefined) {
        return res.status(400).json({
          message: "La moyenne générale est obligatoire"
        });
      }

      // Vérifier que la moyenne est entre 0 et 20
      if (req.body.moyenneGenerale < 0 || req.body.moyenneGenerale > 20) {
        return res.status(400).json({
          message: "La moyenne générale doit être comprise entre 0 et 20"
        });
      }

      await HistoriqueClasse.updateMoyenne(req.params.idHistorique, req.body.moyenneGenerale);

      res.status(200).json({
        message: "Moyenne mise à jour avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour de la moyenne",
        erreur: error.message
      });
    }
  }

  // Mettre à jour un historique complet (réservé au proviseur - contrôle du rôle à faire dans le middleware)
  static async update(req, res) {
    try {

      const historique = await HistoriqueClasse.findById(req.params.idHistorique);

      // Vérifier si l'historique existe
      if (!historique) {
        return res.status(404).json({
          message: "Historique introuvable"
        });
      }

      await HistoriqueClasse.update(req.params.idHistorique, req.body);

      res.status(200).json({
        message: "Historique mis à jour avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour de l'historique",
        erreur: error.message
      });
    }
  }

  // Supprimer un historique
  static async delete(req, res) {
    try {

      const historique = await HistoriqueClasse.findById(req.params.idHistorique);

      // Vérifier si l'historique existe
      if (!historique) {
        return res.status(404).json({
          message: "Historique introuvable"
        });
      }

      await HistoriqueClasse.delete(req.params.idHistorique);

      res.status(200).json({
        message: "Historique supprimé avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de l'historique",
        erreur: error.message
      });
    }
  }

}

module.exports = HistoriqueClasseController;