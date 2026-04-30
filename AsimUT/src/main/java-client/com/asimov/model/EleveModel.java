package com.asimov.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import javafx.beans.property.*;

public class EleveModel {

    private final IntegerProperty idEleve = new SimpleIntegerProperty();
    private final IntegerProperty idUtilisateur = new SimpleIntegerProperty();
    private final IntegerProperty idClasse = new SimpleIntegerProperty();
    private final StringProperty numeroEleve = new SimpleStringProperty();
    private final StringProperty dateInscription = new SimpleStringProperty();
    private final StringProperty actif = new SimpleStringProperty();
    private final StringProperty anneeScolaire = new SimpleStringProperty();
    private final IntegerProperty redoublant = new SimpleIntegerProperty();

    // ✅ Constructeur vide obligatoire pour Jackson
    public EleveModel() {}

    // ✅ Constructeur complet (chargement depuis serveur)
    public EleveModel(int idEleve, int idUtilisateur, int idClasse,
                      String numeroEleve, String dateInscription,
                      String actif, String anneeScolaire, int redoublant) {
// On utilise les setters que nous avons créés plus bas
        // ou directement .set() sur les properties
        setIdEleve(idEleve);
        setIdUtilisateur(idUtilisateur);
        setIdClasse(idClasse);
        setNumeroEleve(numeroEleve);
        setDateInscription(dateInscription);
        setActif(actif);
        setAnneeScolaire(anneeScolaire);
        setRedoublant(redoublant);
    }



    // ✅ Constructeur création (sans idEleve, généré par le serveur)
    public EleveModel(int idUtilisateur, int idClasse, String numeroEleve,
                      String dateInscription, String actif,
                      String anneeScolaire, int redoublant) {
        this(0, idUtilisateur, idClasse, numeroEleve,
                dateInscription, actif, anneeScolaire, redoublant);
    }

    // --- ID ELEVE ---
    @JsonProperty("idEleve")
    public int getIdEleve() { return idEleve.get(); }
    public void setIdEleve(int val) { this.idEleve.set(val); }
    public IntegerProperty idEleveProperty() { return idEleve; }

    // --- ID UTILISATEUR ---
    @JsonProperty("idUtilisateur")
    public int getIdUtilisateur() { return idUtilisateur.get(); }
    public void setIdUtilisateur(int val) { this.idUtilisateur.set(val); }
    public IntegerProperty idUtilisateurProperty() { return idUtilisateur; }

    // --- ID CLASSE ---
    @JsonProperty("idClasse")
    public int getIdClasse() { return idClasse.get(); }
    public void setIdClasse(int val) { this.idClasse.set(val); }
    public IntegerProperty idClasseProperty() { return idClasse; }

    // --- NUMERO ELEVE ---
    @JsonProperty("numeroEleve")
    public String getNumeroEleve() { return numeroEleve.get(); }
    public void setNumeroEleve(String val) { this.numeroEleve.set(val); }
    public StringProperty numeroEleveProperty() { return numeroEleve; }

    // --- DATE INSCRIPTION ---
    @JsonProperty("dateInscription")
    public String getDateInscription() { return dateInscription.get(); }
    public void setDateInscription(String val) { this.dateInscription.set(val); }
    public StringProperty dateInscriptionProperty() { return dateInscription; }

    // --- STATUT (ACTIF) ---
    @JsonProperty("statut")
    public String getActif() { return actif.get(); }
    public void setActif(String val) { this.actif.set(val); }
    public StringProperty actifProperty() { return actif; }

    // --- ANNEE SCOLAIRE ---
    @JsonProperty("anneeScolaire")
    public String getAnneeScolaire() { return anneeScolaire.get(); }
    public void setAnneeScolaire(String val) { this.anneeScolaire.set(val); }
    public StringProperty anneeScolaireProperty() { return anneeScolaire; }

    // --- REDOUBLANT ---
    @JsonProperty("redoublant")
    public int getRedoublant() { return redoublant.get(); }
    public void setRedoublant(int val) { this.redoublant.set(val); }
    public IntegerProperty redoublantProperty() { return redoublant; }
}


