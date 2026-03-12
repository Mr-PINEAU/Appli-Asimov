// Importation d'Express et du Controller Professeur
const express = require("express");
const router = express.Router();
const ProfesseurController = require("../Controller/ProfesseurController");

// Créer un professeur
// POST http://localhost:3000/api/professeurs
router.post("/", ProfesseurController.create);

// Récupérer tous les professeurs
// GET http://localhost:3000/api/professeurs
router.get("/", ProfesseurController.findAll);

// Trouver un professeur par id
// GET http://localhost:3000/api/professeurs/:id
router.get("/:id", ProfesseurController.findById);

// Mettre à jour un professeur
// PUT http://localhost:3000/api/professeurs/:id
router.put("/:id", ProfesseurController.update);

// Supprimer un professeur
// DELETE http://localhost:3000/api/professeurs/:id
router.delete("/:id", ProfesseurController.delete);

module.exports = router;