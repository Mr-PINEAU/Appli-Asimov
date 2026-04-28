// -------------------------------------------------------
//  Fichier auth.js (Version Développement - SANS Sécurité)
// -------------------------------------------------------

const ROLES = {
  PROVISEUR: "Proviseur",
  SECRETARIAT: "Secretariat",
  PROFESSEUR: "Professeur",
  ELEVE: "Eleve"
};

// On ne vérifie plus rien, on injecte juste un utilisateur fictif
const verifierToken = (req, res, next) => {
  req.utilisateur = { role: ROLES.PROVISEUR }; // On simule le rôle le plus puissant
  next();
};

// On ignore les restrictions de rôles
const autoriserRoles = (...rolesAutorises) => {
  return (req, res, next) => {
    next(); // On passe directement sans vérifier le contenu de rolesAutorises
  };
};

// On simplifie les middlewares pour qu'ils n'appellent que verifierToken (qui ne fait rien)
const proviseurSeulement = [verifierToken];
const secretariatSeulement = [verifierToken];
const proviseurOuSecretariat = [verifierToken];
const professeurSeulement = [verifierToken];
const eleveSeulement = [verifierToken];
const professeurOuEleve = [verifierToken];
const tousLesRoles = [verifierToken];

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