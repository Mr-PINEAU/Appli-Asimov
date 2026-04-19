// Importation de jsonwebtoken
const jwt = require("jsonwebtoken");

// -------------------------------------------------------
//  Clé secrète JWT (à stocker dans un fichier .env)
// -------------------------------------------------------
const JWT_SECRET = process.env.JWT_SECRET || "votre_clé_secrète";

// -------------------------------------------------------
//  Définition des rôles
// -------------------------------------------------------
const ROLES = {
  PROVISEUR:    "Proviseur",
  SECRETARIAT:  "Secretariat",
  PROFESSEUR:   "Professeur",
  ELEVE:        "Eleve"
};

// -------------------------------------------------------
//  Vérification du token JWT
//  À utiliser sur toutes les routes protégées
// -------------------------------------------------------
const verifierToken = (req, res, next) => {
  try {

    // Récupérer le token dans le header Authorization
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({
        message: "Accès refusé : aucun token fourni"
      });
    }

    // Le token est au format "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Accès refusé : format du token invalide"
      });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Stocker les infos de l'utilisateur dans la requête
    req.utilisateur = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Accès refusé : token invalide ou expiré"
    });
  }
};

// -------------------------------------------------------
//  Restriction par rôle(s)
//  Utilisation : autoriserRoles("Proviseur", "Secretariat")
// -------------------------------------------------------
const autoriserRoles = (...rolesAutorises) => {
  return (req, res, next) => {

    if (!req.utilisateur) {
      return res.status(401).json({
        message: "Accès refusé : utilisateur non authentifié"
      });
    }

    if (!rolesAutorises.includes(req.utilisateur.role)) {
      return res.status(403).json({
        message: `Accès refusé : cette action est réservée aux rôles suivants : ${rolesAutorises.join(", ")}`
      });
    }

    next();
  };
};

// -------------------------------------------------------
//  Middlewares prêts à l'emploi par rôle
// -------------------------------------------------------

// Réservé au proviseur uniquement
const proviseurSeulement = [verifierToken, autoriserRoles(ROLES.PROVISEUR)];

// Réservé au secrétariat uniquement
const secretariatSeulement = [verifierToken, autoriserRoles(ROLES.SECRETARIAT)];

// Réservé au proviseur et au secrétariat
const proviseurOuSecretariat = [verifierToken, autoriserRoles(ROLES.PROVISEUR, ROLES.SECRETARIAT)];

// Réservé aux professeurs uniquement
const professeurSeulement = [verifierToken, autoriserRoles(ROLES.PROFESSEUR)];

// Réservé aux élèves uniquement
const eleveSeulement = [verifierToken, autoriserRoles(ROLES.ELEVE)];

// Réservé aux professeurs et élèves (lecture)
const professeurOuEleve = [verifierToken, autoriserRoles(ROLES.PROFESSEUR, ROLES.ELEVE)];

// Tous les rôles authentifiés
const tousLesRoles = [verifierToken];

// -------------------------------------------------------
//  Export
// -------------------------------------------------------
module.exports = {
  ROLES,
  verifierToken,
  autoriserRoles,
  proviseurSeulement,
  secretariatSeulement,
  proviseurOuSecretariat,
  professeurSeulement,
  eleveSeulement,
  professeurOuEleve,
  tousLesRoles
};