const express = require("express");
const router = express.Router();
const EleveController = require("../Controller/EleveController");

// On ne garde que l'essentiel : la route et l'action du contrôleur

// Récupérer tous les élèves
// GET http://localhost:3000/api/eleves
router.get("/", EleveController.findAll);

// Trouver un élève par id
// GET http://localhost:3000/api/eleves/:idEleve
router.get("/:idEleve", EleveController.findById);

// Créer un élève
router.post("/", EleveController.create);

// Mettre à jour un élève
router.put("/:idEleve", EleveController.update);

// Supprimer un élève
router.delete("/:idEleve", EleveController.delete);

module.exports = router;