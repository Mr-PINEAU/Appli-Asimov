// Importation d'Express et du Controller Convention
const express = require("express");
const router = express.Router();
const ConventionController = require("../Controller/ConventionController");

// Créer une convention (réservé à l'élève)
// POST http://localhost:3000/api/conventions
router.post("/", ConventionController.create);

// Récupérer toutes les conventions
// GET http://localhost:3000/api/conventions
router.get("/", ConventionController.findAll);

// Trouver la convention d'un stage
// GET http://localhost:3000/api/conventions/stage/:idStage
router.get("/stage/:idStage", ConventionController.findByStage);

// Trouver une convention par id
// GET http://localhost:3000/api/conventions/:idConvention
router.get("/:idConvention", ConventionController.findById);

// Valider une convention par l'enseignant référent
// PATCH http://localhost:3000/api/conventions/:idConvention/valider
router.patch("/:idConvention/valider", ConventionController.validerConvention);

// Mettre à jour une convention (réservé à l'élève avant signature)
// PUT http://localhost:3000/api/conventions/:idConvention
router.put("/:idConvention", ConventionController.update);

// Supprimer une convention
// DELETE http://localhost:3000/api/conventions/:idConvention
router.delete("/:idConvention", ConventionController.delete);

module.exports = router;