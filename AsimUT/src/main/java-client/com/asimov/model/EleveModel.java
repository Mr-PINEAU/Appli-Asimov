package com.asimov.model;

public class EleveModel {

    private int IdEleve;
    private int IdUtilisateur;
    private int IdClasse;
    private String numeroEleve;
    private String dateInscription;
    private String actif;
    private String anneeScolaire;
    private boolean redoublant;

    public Eleve() {}

    // Récupération d'un eleves existant ou modification
    public Eleve(int IdEleve,int IdUtilisateur, int IdClasse, String numeroEleve, String dateInscription, String actif, String anneeScolairee, boolean redoublant) {

        this.IdEleve = IdEleve;
        this.IdUtilisateur = IdUtilisateur;
        this.IdClasse = IdClasse;
        this.numeroEleve = numeroEleve;
        this.dateInscription = dateInscription;
        this.actif = actif;
        this.anneeScolaire = anneeScolairee;
        this.redoublant = redoublant;
    }
    // Creation d'un nouvel eleves
    public Eleve(int IdUtilisateur, int IdClasse, String numeroEleve, String dateInscription, String actif, String anneeScolairee, boolean redoublant) {

        this.IdUtilisateur = idUtilisateur;
        this.IdClasse = IdClasse;
        this.numeroEleve = numeroEleve;
        this.dateInscription = dateInscription;
        this.actif = actif;
        this.anneeScolaire = anneeScolairee;
        this.redoublant = redoublant;
    }

    public int getIdEleve() { return IdEleve; }
    public void setIdEleve(int IdEleve) { this.IdEleve = IdEleve; }

    public int getIdUtilisateur() { return IdUtilisateur; }
    public void setIdUtilisateur(int IdUtilisateur) { this.IdUtilisateur = IdUtilisateur; }

    public int getIdClasse() { return IdClasse; }
    public void setIdClasse(String IdClasse) { this.IdClasse = IdClasse; }

    public String getNumeroEleve() { return numeroEleve; }
    public void setNumeroEleve(String numeroEleve) { this.numeroEleve = numeroEleve; }

    public String getDateInscription() { return dateInscription; }
    public void setDateInscription(String dateInscription) { this.dateInscription = dateInscription; }

    public String getActif() { return actif; }
    public void setActif(String actif) { this.actif = actif; }

    public String getAnneeScolaire() { return anneeScolaire; }
    public void setAnneeScolaire(String anneeScolaire) { this.anneeScolaire = anneeScolaire; }

    public boolean getRedoublant() { return redoublant; }
    public void setRedoublant(String redoublant) { this.redoublant = redoublant; }


}
