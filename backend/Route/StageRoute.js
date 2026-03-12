// Importation d'Express et du Controller Stage
const express = require("express");
const router = express.Router();
const StageController = require("../Controller/StageController");

// Créer un stage
// POST http://localhost:3000/api/stages
router.post("/", StageController.create);

// Récupérer tous les stages
// GET http://localhost:3000/api/stages
router.get("/", StageController.findAll);

// Trouver un stage par id
// GET http://localhost:3000/api/stages/:idStage
router.get("/:idStage", StageController.findById);

// Mettre à jour un stage
// PUT http://localhost:3000/api/stages/:idStage
router.put("/:idStage", StageController.update);

// Supprimer un stage
// DELETE http://localhost:3000/api/stages/:idStage
router.delete("/:idStage", StageController.delete);

module.exports = router;