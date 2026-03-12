// Importation d'Express et du Controller HistoriqueClasse
const express = require("express");
const router = express.Router();
const HistoriqueClasseController = require("../Controller/HistoriqueClasseController");

// Créer un historique
// POST http://localhost:3000/api/historique-classes
router.post("/", HistoriqueClasseController.create);

// Récupérer tout l'historique
// GET http://localhost:3000/api/historique-classes
router.get("/", HistoriqueClasseController.findAll);

// Trouver un historique par id
// GET http://localhost:3000/api/historique-classes/:idHistorique
router.get("/:idHistorique", HistoriqueClasseController.findById);

// Trouver tout l'historique d'un élève (toutes ses classes passées)
// GET http://localhost:3000/api/historique-classes/eleve/:idEleve
router.get("/eleve/:idEleve", HistoriqueClasseController.findByEleve);

// Trouver les moyennes d'un élève par semestre
// GET http://localhost:3000/api/historique-classes/eleve/:idEleve/moyennes
router.get("/eleve/:idEleve/moyennes", HistoriqueClasseController.findMoyennesByEleve);

// Mettre à jour la moyenne uniquement (réservé au proviseur)
// PATCH http://localhost:3000/api/historique-classes/:idHistorique/moyenne
router.patch("/:idHistorique/moyenne", HistoriqueClasseController.updateMoyenne);

// Mettre à jour un historique complet (réservé au proviseur)
// PUT http://localhost:3000/api/historique-classes/:idHistorique
router.put("/:idHistorique", HistoriqueClasseController.update);

// Supprimer un historique
// DELETE http://localhost:3000/api/historique-classes/:idHistorique
router.delete("/:idHistorique", HistoriqueClasseController.delete);

module.exports = router;