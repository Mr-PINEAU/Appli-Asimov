package com.asimov.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class EleveModel {

    // ✅ Tous en minuscule
    @JsonProperty("idEleve")
    private int idEleve;

    @JsonProperty("idUtilisateur")
    private int idUtilisateur;

    @JsonProperty("idClasse")
    private int idClasse;

    @JsonProperty("numeroEleve")
    private String numeroEleve;

    @JsonProperty("dateInscription")
    private String dateInscription;

    @JsonProperty("statut")
    private String actif;

    @JsonProperty("anneeScolaire")
    private String anneeScolaire;

    @JsonProperty("redoublant")
    private int redoublant;

    // ✅ Constructeur vide obligatoire pour Jackson
    public EleveModel() {}

    // ✅ Constructeur complet (chargement depuis serveur)
    public EleveModel(int idEleve, int idUtilisateur, int idClasse,
                      String numeroEleve, String dateInscription,
                      String actif, String anneeScolaire, int redoublant) {
        this.idEleve       = idEleve;
        this.idUtilisateur = idUtilisateur;
        this.idClasse      = idClasse;
        this.numeroEleve   = numeroEleve;
        this.dateInscription = dateInscription;
        this.actif         = actif;
        this.anneeScolaire = anneeScolaire;
        this.redoublant    = redoublant;
    }

    // ✅ Constructeur création (sans idEleve, généré par le serveur)
    public EleveModel(int idUtilisateur, int idClasse, String numeroEleve,
                      String dateInscription, String actif,
                      String anneeScolaire, int redoublant) {
        this(0, idUtilisateur, idClasse, numeroEleve,
                dateInscription, actif, anneeScolaire, redoublant);
    }

    // ✅ Getters / Setters — tous en minuscule
    public int getIdEleve() { return idEleve; }
    public void setIdEleve(int idEleve) { this.idEleve = idEleve; }

    public int getIdUtilisateur() { return idUtilisateur; }
    public void setIdUtilisateur(int idUtilisateur) { this.idUtilisateur = idUtilisateur; }

    public int getIdClasse() { return idClasse; }
    public void setIdClasse(int idClasse) { this.idClasse = idClasse; }

    public String getNumeroEleve() { return numeroEleve; }
    public void setNumeroEleve(String numeroEleve) { this.numeroEleve = numeroEleve; }

    public String getDateInscription() { return dateInscription; }
    public void setDateInscription(String dateInscription) { this.dateInscription = dateInscription; }

    public String getActif() { return actif; }
    public void setActif(String actif) { this.actif = actif; }

    public String getAnneeScolaire() { return anneeScolaire; }
    public void setAnneeScolaire(String anneeScolaire) { this.anneeScolaire = anneeScolaire; }

    public int getRedoublant() { return redoublant; }
    public void setRedoublant(int redoublant) { this.redoublant = redoublant; }
}