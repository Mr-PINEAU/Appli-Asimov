// server.js — ordre correct
require("dotenv").config(); // ← ABSOLUMENT EN PREMIER, avant tout le reste

const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors') // Cross Origin Resource Sharing
const morgan = require('morgan') // logs pour authentification par token


const app = express();
const PORT = process.env.PORT || 3000;

// Utilisation des middlewares pour l'authentification
app.use(cors())
app.use(morgan('tiny'))

// Middleware pour parser le JSON

app.use(express.json());

// Route de test (page d'accueil)
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Express !');
});



//  Importation des Routes
// -------------------------------------------------------
const classeRoute          = require("./Route/ClasseRoute");
const eleveRoute           = require("./Route/EleveRoute");
const professeurRoute      = require("./Route/ProfesseurRoute");
const stageRoute           = require("./Route/StageRoute");
const conventionRoute      = require("./Route/ConventionRoute");
const projetRoute          = require("./Route/ProjetRoute");
const historiqueClasseRoute = require("./Route/HistoriqueClasseRoute");

//  Déclaration des Routes
// -------------------------------------------------------
app.use("/api/classes",            classeRoute);
app.use("/api/eleves",             eleveRoute);
app.use("/api/professeurs",        professeurRoute);
app.use("/api/stages",             stageRoute);
app.use("/api/conventions",        conventionRoute);
app.use("/api/projets",            projetRoute);
app.use("/api/historique-classes", historiqueClasseRoute);

//  Gestion des routes inexistantes (404)
// -------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    message: "Route introuvable"
  });
});

const options = {
  key:  fs.readFileSync('./certificate/key.pem'),
  cert: fs.readFileSync('./certificate/cert.pem'),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`✅ HTTPS server running on port ${PORT}`);
});