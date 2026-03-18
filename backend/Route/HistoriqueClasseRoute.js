// Importation d'Express et du Controller HistoriqueClasse
const express = require("express");
const router = express.Router();
const HistoriqueClasseController = require("../Controller/HistoriqueClasseController");
const { tousLesRoles, secretariatSeulement, proviseurOuSecretariat, proviseurSeulement } = require("../Middleware/auth");

// Créer un historique (secrétariat uniquement)
// POST http://localhost:3000/api/historique-classes
router.post("/", secretariatSeulement, HistoriqueClasseController.create);

// Récupérer tout l'historique (secrétariat et proviseur)
// GET http://localhost:3000/api/historique-classes
router.get("/", proviseurOuSecretariat, HistoriqueClasseController.findAll);

// Trouver tout l'historique d'un élève (tout le monde)
// GET http://localhost:3000/api/historique-classes/eleve/:idEleve
router.get("/eleve/:idEleve", tousLesRoles, HistoriqueClasseController.findByEleve);

// Trouver les moyennes d'un élève par semestre (tout le monde)
// GET http://localhost:3000/api/historique-classes/eleve/:idEleve/moyennes
router.get("/eleve/:idEleve/moyennes", tousLesRoles, HistoriqueClasseController.findMoyennesByEleve);

// Trouver un historique par id (secrétariat et proviseur)
// GET http://localhost:3000/api/historique-classes/:idHistorique
router.get("/:idHistorique", proviseurOuSecretariat, HistoriqueClasseController.findById);

// Mettre à jour la moyenne uniquement (proviseur uniquement)
// PATCH http://localhost:3000/api/historique-classes/:idHistorique/moyenne
router.patch("/:idHistorique/moyenne", proviseurSeulement, HistoriqueClasseController.updateMoyenne);

// Mettre à jour un historique complet (proviseur uniquement)
// PUT http://localhost:3000/api/historique-classes/:idHistorique
router.put("/:idHistorique", proviseurSeulement, HistoriqueClasseController.update);

// Supprimer un historique (proviseur uniquement)
// DELETE http://localhost:3000/api/historique-classes/:idHistorique
router.delete("/:idHistorique", proviseurSeulement, HistoriqueClasseController.delete);

module.exports = router;