// server.js — ordre correct
require("dotenv").config(); // ← ABSOLUMENT EN PREMIER, avant tout le reste


const cors = require('cors') // Cross Origin Resource Sharing
const morgan = require('morgan') // logs pour authentification par token

const express = require('express');
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


// Démarrer le serveur
 app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
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

