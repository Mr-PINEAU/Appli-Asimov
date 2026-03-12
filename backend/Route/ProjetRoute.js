// Importation d'Express et du Controller Projet
const express = require("express");
const router = express.Router();
const ProjetController = require("../Controller/ProjetController");

// Créer un projet
// POST http://localhost:3000/api/projets
router.post("/", ProjetController.create);

// Récupérer tous les projets
// GET http://localhost:3000/api/projets
router.get("/", ProjetController.findAll);

// Trouver un projet par id
// GET http://localhost:3000/api/projets/:idProjet
router.get("/:idProjet", ProjetController.findById);

// Trouver tous les projets dont un utilisateur est responsable
// GET http://localhost:3000/api/projets/responsable/:idResponsable
router.get("/responsable/:idResponsable", ProjetController.findByResponsable);

// Trouver tous les projets auxquels un élève participe
// GET http://localhost:3000/api/projets/participant/:idEleve
router.get("/participant/:idEleve", ProjetController.findByParticipant);

// Valider un projet par la commission (réservé à la commission)
// PATCH http://localhost:3000/api/projets/:idProjet/valider
router.patch("/:idProjet/valider", ProjetController.validerProjet);

// Mettre à jour un projet
// PUT http://localhost:3000/api/projets/:idProjet
router.put("/:idProjet", ProjetController.update);

// Supprimer un projet
// DELETE http://localhost:3000/api/projets/:idProjet
router.delete("/:idProjet", ProjetController.delete);


// -------------------------------------------------------
//  Gestion des participations
// -------------------------------------------------------

// Ajouter un participant à un projet
// POST http://localhost:3000/api/projets/:idProjet/participants
router.post("/:idProjet/participants", ProjetController.addParticipant);

// Récupérer tous les participants d'un projet
// GET http://localhost:3000/api/projets/:idProjet/participants
router.get("/:idProjet/participants", ProjetController.findParticipants);

// Clôturer la participation d'un élève à un projet
// PATCH http://localhost:3000/api/projets/:idProjet/participants/cloturer
router.patch("/:idProjet/participants/cloturer", ProjetController.closeParticipant);

// Retirer un participant d'un projet
// DELETE http://localhost:3000/api/projets/:idProjet/participants
router.delete("/:idProjet/participants", ProjetController.removeParticipant);

module.exports = router;