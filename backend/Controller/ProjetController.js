// Importation du modèle Projet
const Projet = require("../model/ProjetModel");

class ProjetController {

  // Créer un projet
  static async create(req, res) {
    try {

      const insertId = await Projet.create(req.body);

      res.status(201).json({
        message: "Projet créé avec succès",
        idProjet: insertId
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création du projet",
        erreur: error.message
      });
    }
  }

  // Récupérer tous les projets
  static async findAll(req, res) {
    try {

      const projets = await Projet.findAll();

      res.status(200).json(projets);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des projets",
        erreur: error.message
      });
    }
  }

  // Trouver un projet par id
  static async findById(req, res) {
    try {

      const projet = await Projet.findById(req.params.idProjet);

      // Vérifier si le projet existe
      if (!projet) {
        return res.status(404).json({
          message: "Projet introuvable"
        });
      }

      res.status(200).json(projet);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération du projet",
        erreur: error.message
      });
    }
  }

  // Trouver tous les projets dont un utilisateur est responsable
  static async findByResponsable(req, res) {
    try {

      const projets = await Projet.findByResponsable(req.params.idResponsable);

      res.status(200).json(projets);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des projets du responsable",
        erreur: error.message
      });
    }
  }

  // Trouver tous les projets auxquels un élève participe
  static async findByParticipant(req, res) {
    try {

      const projets = await Projet.findByParticipant(req.params.idEleve);

      res.status(200).json(projets);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des projets du participant",
        erreur: error.message
      });
    }
  }

  // Mettre à jour un projet
  static async update(req, res) {
    try {

      const projet = await Projet.findById(req.params.idProjet);

      // Vérifier si le projet existe
      if (!projet) {
        return res.status(404).json({
          message: "Projet introuvable"
        });
      }

      await Projet.update(req.params.idProjet, req.body);

      res.status(200).json({
        message: "Projet mis à jour avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour du projet",
        erreur: error.message
      });
    }
  }

  // Valider un projet par la commission (contrôle du rôle à faire dans le middleware)
  static async validerProjet(req, res) {
    try {

      const projet = await Projet.findById(req.params.idProjet);

      // Vérifier si le projet existe
      if (!projet) {
        return res.status(404).json({
          message: "Projet introuvable"
        });
      }

      // Vérifier que le projet n'est pas déjà validé
      if (projet.valideParCommission) {
        return res.status(400).json({
          message: "Ce projet est déjà validé par la commission"
        });
      }

      await Projet.validerProjet(req.params.idProjet);

      res.status(200).json({
        message: "Projet validé par la commission avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la validation du projet",
        erreur: error.message
      });
    }
  }

  // Supprimer un projet
  static async delete(req, res) {
    try {

      const projet = await Projet.findById(req.params.idProjet);

      // Vérifier si le projet existe
      if (!projet) {
        return res.status(404).json({
          message: "Projet introuvable"
        });
      }

      await Projet.delete(req.params.idProjet);

      res.status(200).json({
        message: "Projet supprimé avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression du projet",
        erreur: error.message
      });
    }
  }


  // -------------------------------------------------------
  //  Gestion des participations
  // -------------------------------------------------------

  // Ajouter un participant à un projet
  static async addParticipant(req, res) {
    try {

      const projet = await Projet.findById(req.params.idProjet);

      // Vérifier si le projet existe
      if (!projet) {
        return res.status(404).json({
          message: "Projet introuvable"
        });
      }

      // Vérifier que le projet est bien validé avant d'ajouter des participants
      if (!projet.valideParCommission) {
        return res.status(400).json({
          message: "Impossible d'ajouter un participant : le projet n'est pas encore validé par la commission"
        });
      }

      const insertId = await Projet.addParticipant(
        req.params.idProjet,
        req.body.idEleve,
        req.body.idProfesseur,
        req.body.date_Debut
      );

      res.status(201).json({
        message: "Participant ajouté avec succès",
        idParticipation: insertId
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de l'ajout du participant",
        erreur: error.message
      });
    }
  }

  // Clôturer la participation d'un élève à un projet
  static async closeParticipant(req, res) {
    try {

      await Projet.closeParticipant(
        req.params.idProjet,
        req.body.idEleve,
        req.body.idProfesseur,
        req.body.date_Fin
      );

      res.status(200).json({
        message: "Participation clôturée avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la clôture de la participation",
        erreur: error.message
      });
    }
  }

  // Récupérer tous les participants d'un projet
  static async findParticipants(req, res) {
    try {

      const projet = await Projet.findById(req.params.idProjet);

      // Vérifier si le projet existe
      if (!projet) {
        return res.status(404).json({
          message: "Projet introuvable"
        });
      }

      const participants = await Projet.findParticipants(req.params.idProjet);

      res.status(200).json(participants);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des participants",
        erreur: error.message
      });
    }
  }

  // Retirer un participant d'un projet
  static async removeParticipant(req, res) {
    try {

      const projet = await Projet.findById(req.params.idProjet);

      // Vérifier si le projet existe
      if (!projet) {
        return res.status(404).json({
          message: "Projet introuvable"
        });
      }

      await Projet.removeParticipant(
        req.params.idProjet,
        req.body.idEleve,
        req.body.idProfesseur
      );

      res.status(200).json({
        message: "Participant retiré avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors du retrait du participant",
        erreur: error.message
      });
    }
  }

}

module.exports = ProjetController;