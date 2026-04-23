const loginCtrl = require('../controllers/loginControllers')
const express = require('express')
// Instantiation du router pour permettre la gestion des requêtes HTTP (get, post, etc.)
const router = express.Router()
// Une authentification se passe par méthode POST
router.post('/',loginCtrl.login)
// exportation du module (pour le rendre utilisable dans un autre fichier)
module.exports = router 