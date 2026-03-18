// Importation d'Express et du Controller Convention
// Importation d'Express et du Controller Convention
const express = require("express");
const router = express.Router();
const ConventionController = require("../Controller/ConventionController");
const { tousLesRoles, eleveSeulement, professeurSeulement, proviseurOuSecretariat, proviseurSeulement } = require("../Middleware/auth");

// Créer une convention (élève uniquement)
// POST http://localhost:3000/api/conventions
router.post("/", eleveSeulement, ConventionController.create);

// Récupérer toutes les conventions (secrétariat et proviseur)
// GET http://localhost:3000/api/conventions
router.get("/", proviseurOuSecretariat, ConventionController.findAll);

// Trouver la convention d'un stage (tout le monde)
// GET http://localhost:3000/api/conventions/stage/:idStage
router.get("/stage/:idStage", tousLesRoles, ConventionController.findByStage);

// Trouver une convention par id (tout le monde)
// GET http://localhost:3000/api/conventions/:idConvention
router.get("/:idConvention", tousLesRoles, ConventionController.findById);

// Valider une convention (enseignant référent uniquement)
// PATCH http://localhost:3000/api/conventions/:idConvention/valider
router.patch("/:idConvention/valider", professeurSeulement, ConventionController.validerConvention);

// Mettre à jour une convention (élève uniquement, avant signature)
// PUT http://localhost:3000/api/conventions/:idConvention
router.put("/:idConvention", eleveSeulement, ConventionController.update);

// Supprimer une convention (proviseur uniquement)
// DELETE http://localhost:3000/api/conventions/:idConvention
router.delete("/:idConvention", proviseurSeulement, ConventionController.delete);

module.exports = router;