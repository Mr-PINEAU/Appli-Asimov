package com.asimov.model;

import java.util.Date;

public class ProfesseurModel {


    private int IdProfesseur;
    private int IdUtilisateur;
    private String matricule;
    private String specialite;
    private Date dateEmbauche;

    public ProfesseurModel (int IdUtilisateur ,String matricule, String specialite, Date dateEmbauche) {

        this.IdUtilisateur = IdUtilisateur;
        this.matricule = matricule;
        this.specialite = specialite;
        this.dateEmbauche = dateEmbauche;

    }


    public int getIdProfesseur() { return IdProfesseur; }
    public void setIdProfesseur(int IdProfesseur) { this.IdProfesseur = IdProfesseur; }

    public int getIdUtilisateur() { return IdUtilisateur; }
    public void setIdUtilisateur(int IdUtilisateur) { this.IdUtilisateur = IdUtilisateur; }

    public String getMatricule() { return matricule; }
    public void setMatricule(String matricule) { this.matricule = matricule; }

    public String getSpecialite() { return specialite; }
    public void setSpecialite(String specialite) { this.specialite = specialite; }

    public Date getDateEmbauche() { return dateEmbauche; }
    public void setDateEmbauche(Date dateEmbauche) { this.dateEmbauche = dateEmbauche; }
}
