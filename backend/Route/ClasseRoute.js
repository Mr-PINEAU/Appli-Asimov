// Importation d'Express et du Controller Classe
const express = require("express");
const router = express.Router();
const ClasseController = require("../Controller/ClasseController");
const { tousLesRoles, proviseurOuSecretariat, proviseurSeulement } = require("../Middleware/auth");

// Créer une classe (secrétariat et proviseur)
// POST http://localhost:3000/api/classes
router.post("/", proviseurOuSecretariat, ClasseController.create);

// Récupérer toutes les classes (tout le monde)
// GET http://localhost:3000/api/classes
router.get("/", tousLesRoles, ClasseController.findAll);

// Trouver une classe par id (tout le monde)
// GET http://localhost:3000/api/classes/:id_classe
router.get("/:id_classe", tousLesRoles, ClasseController.findById);

// Mettre à jour une classe (secrétariat et proviseur)
// PUT http://localhost:3000/api/classes/:id_classe
router.put("/:id_classe", proviseurOuSecretariat, ClasseController.update);

// Supprimer une classe (proviseur uniquement)
// DELETE http://localhost:3000/api/classes/:id_classe
router.delete("/:id_classe", proviseurSeulement, ClasseController.delete);

module.exports = router;