// Importation d'Express et du Controller Stage
const express = require("express");
const router = express.Router();
const StageController = require("../Controller/StageController");
const { tousLesRoles, secretariatSeulement, proviseurOuSecretariat, proviseurSeulement } = require("../Middleware/auth");

// Créer un stage (secrétariat uniquement)
// POST http://localhost:3000/api/stages
router.post("/", secretariatSeulement, StageController.create);

// Récupérer tous les stages (secrétariat et proviseur)
// GET http://localhost:3000/api/stages
router.get("/", proviseurOuSecretariat, StageController.findAll);

// Trouver un stage par id (tout le monde)
// GET http://localhost:3000/api/stages/:idStage
router.get("/:idStage", tousLesRoles, StageController.findById);

// Mettre à jour un stage (secrétariat et proviseur)
// PUT http://localhost:3000/api/stages/:idStage
router.put("/:idStage", proviseurOuSecretariat, StageController.update);

// Supprimer un stage (proviseur uniquement)
// DELETE http://localhost:3000/api/stages/:idStage
router.delete("/:idStage", proviseurSeulement, StageController.delete);

module.exports = router;