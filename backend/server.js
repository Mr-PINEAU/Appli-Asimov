// Importer Express
const express = require ('express');

//Importation des models
const Eleve = require("./Model/Eleve");
const Professeur = require("./Model/Professeur");

// Créer l'application Express
const app = express();

// Définir le port
const PORT = 3000;

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