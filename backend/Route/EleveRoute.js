// Importation d'Express et du Controller Eleve
const express = require("express");
const router = express.Router();
const EleveController = require("../Controller/EleveController");
const { tousLesRoles, secretariatSeulement, proviseurOuSecretariat, proviseurSeulement } = require("../Middleware/auth");

// Créer un élève (secrétariat uniquement)
// POST http://localhost:3000/api/eleves
router.post("/", secretariatSeulement, EleveController.create);

// Récupérer tous les élèves (secrétariat et proviseur)
// GET http://localhost:3000/api/eleves
router.get("/", proviseurOuSecretariat, EleveController.findAll);

// Trouver un élève par id (tout le monde)
// GET http://localhost:3000/api/eleves/:idEleve
router.get("/:idEleve", tousLesRoles, EleveController.findById);

// Mettre à jour un élève (secrétariat et proviseur)
// PUT http://localhost:3000/api/eleves/:idEleve
router.put("/:idEleve", proviseurOuSecretariat, EleveController.update);

// Supprimer un élève (proviseur uniquement)
// DELETE http://localhost:3000/api/eleves/:idEleve
router.delete("/:idEleve", proviseurSeulement, EleveController.delete);

module.exports = router;