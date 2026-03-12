// Importation d'Express et du Controller Eleve
const express = require("express");
const router = express.Router();
const EleveController = require("../Controller/EleveController");

// Créer un élève
// POST http://localhost:3000/api/eleves
router.post("/", EleveController.create);

// Récupérer tous les élèves
// GET http://localhost:3000/api/eleves
router.get("/", EleveController.findAll);

// Trouver un élève par id
// GET http://localhost:3000/api/eleves/:idEleve
router.get("/:idEleve", EleveController.findById);

// Mettre à jour un élève
// PUT http://localhost:3000/api/eleves/:idEleve
router.put("/:idEleve", EleveController.update);

// Supprimer un élève
// DELETE http://localhost:3000/api/eleves/:idEleve
router.delete("/:idEleve", EleveController.delete);

module.exports = router;