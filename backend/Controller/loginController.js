// Contient la logique nécessaire à l'authentification
const jwt = require('jsonwebtoken') // ajout token sécurisé
const SECRET = 'appKey' // normal. dans un fichier de conf.
var loginController={
login(req,res){
 if (!req.body.username || !req.body.password) {
 return res.status(400).json({ message: `Erreur authentif.` })
 }
 // Simulation d'un utilisateur géré dans une BDD
 if (req.body.username == "admin" && req.body.password =="azerty123") {
 const token = jwt.sign(
 { id: 0, username: req.body.username},
 SECRET,
 { expiresIn: '1 hours'}
 )
 return res.json({ access_token: token})
 } else {
 return res.status(400).json({ message: `Erreur D'authentif.` })
 }
},
Error(req, res) {
res.render('404')
}
}
module.exports = loginController; 