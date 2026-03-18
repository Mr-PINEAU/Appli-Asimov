// Importation d'Express et du Controller Professeur
const express = require("express");
const router = express.Router();
const ProfesseurController = require("../Controller/ProfesseurController");
const { tousLesRoles, secretariatSeulement, proviseurOuSecretariat, proviseurSeulement } = require("../Middleware/auth");

// Créer un professeur (secrétariat uniquement)
// POST http://localhost:3000/api/professeurs
router.post("/", secretariatSeulement, ProfesseurController.create);

// Récupérer tous les professeurs (secrétariat et proviseur)
// GET http://localhost:3000/api/professeurs
router.get("/", proviseurOuSecretariat, ProfesseurController.findAll);

// Trouver un professeur par id (tout le monde)
// GET http://localhost:3000/api/professeurs/:id
router.get("/:id", tousLesRoles, ProfesseurController.findById);

// Mettre à jour un professeur (secrétariat et proviseur)
// PUT http://localhost:3000/api/professeurs/:id
router.put("/:id", proviseurOuSecretariat, ProfesseurController.update);

// Supprimer un professeur (proviseur uniquement)
// DELETE http://localhost:3000/api/professeurs/:id
router.delete("/:id", proviseurSeulement, ProfesseurController.delete);

module.exports = router;