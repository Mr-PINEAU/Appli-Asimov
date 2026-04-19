// Importation d'Express et du Controller Projet
const express = require("express");
const router = express.Router();
const ProjetController = require("../Controller/ProjetController");
const { tousLesRoles, secretariatSeulement, proviseurOuSecretariat, proviseurSeulement } = require("../Middleware/auth");

// Créer un projet (tout le monde)
// POST http://localhost:3000/api/projets
router.post("/", tousLesRoles, ProjetController.create);

// Récupérer tous les projets (tout le monde)
// GET http://localhost:3000/api/projets
router.get("/", tousLesRoles, ProjetController.findAll);

// Trouver tous les projets dont un utilisateur est responsable (tout le monde)
// GET http://localhost:3000/api/projets/responsable/:idResponsable
router.get("/responsable/:idResponsable", tousLesRoles, ProjetController.findByResponsable);

// Trouver tous les projets auxquels un élève participe (tout le monde)
// GET http://localhost:3000/api/projets/participant/:idEleve
router.get("/participant/:idEleve", tousLesRoles, ProjetController.findByParticipant);

// Trouver un projet par id (tout le monde)
// GET http://localhost:3000/api/projets/:idProjet
router.get("/:idProjet", tousLesRoles, ProjetController.findById);

// Valider un projet par la commission (proviseur uniquement)
// PATCH http://localhost:3000/api/projets/:idProjet/valider
router.patch("/:idProjet/valider", proviseurSeulement, ProjetController.validerProjet);

// Mettre à jour un projet (secrétariat et proviseur)
// PUT http://localhost:3000/api/projets/:idProjet
router.put("/:idProjet", proviseurOuSecretariat, ProjetController.update);

// Supprimer un projet (proviseur uniquement)
// DELETE http://localhost:3000/api/projets/:idProjet
router.delete("/:idProjet", proviseurSeulement, ProjetController.delete);


// -------------------------------------------------------
//  Gestion des participations
// -------------------------------------------------------

// Ajouter un participant à un projet (secrétariat uniquement)
// POST http://localhost:3000/api/projets/:idProjet/participants
router.post("/:idProjet/participants", secretariatSeulement, ProjetController.addParticipant);

// Récupérer tous les participants d'un projet (tout le monde)
// GET http://localhost:3000/api/projets/:idProjet/participants
router.get("/:idProjet/participants", tousLesRoles, ProjetController.findParticipants);

// Clôturer la participation d'un élève à un projet (secrétariat et proviseur)
// PATCH http://localhost:3000/api/projets/:idProjet/participants/cloturer
router.patch("/:idProjet/participants/cloturer", proviseurOuSecretariat, ProjetController.closeParticipant);

// Retirer un participant d'un projet (proviseur uniquement)
// DELETE http://localhost:3000/api/projets/:idProjet/participants
router.delete("/:idProjet/participants", proviseurSeulement, ProjetController.removeParticipant);

module.exports = router;