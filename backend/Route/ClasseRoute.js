// Importation d'Express et du Controller Classe
const express = require("express");
const router = express.Router();
const ClasseController = require("../Controller/ClasseController");

// Créer une classe
// POST http://localhost:3000/api/classes
router.post("/", ClasseController.create);

// Récupérer toutes les classes
// GET http://localhost:3000/api/classes
router.get("/", ClasseController.findAll);

// Trouver une classe par id
// GET http://localhost:3000/api/classes/:id_classe
router.get("/:id_classe", ClasseController.findById);

// Mettre à jour une classe
// PUT http://localhost:3000/api/classes/:id_classe
router.put("/:id_classe", ClasseController.update);

// Supprimer une classe
// DELETE http://localhost:3000/api/classes/:id_classe
router.delete("/:id_classe", ClasseController.delete);

module.exports = router;