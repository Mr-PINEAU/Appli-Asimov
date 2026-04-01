package com.asimov.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ConventionModel {


    @JsonProperty("Idconvention")
    private int IdConvention;

    private String entreprise;
    private String tuteur;

    @JsonProperty("date_debut")
    private String date_debut;

    @JsonProperty("date_fin")
    private String date_fin;

    private boolean signature;

    @JsonProperty("Idstage")
    private int IdStage;

    public ConventionModel (String entreprise, String tuteur, String date_debut, String date_fin, Boolean signature , int IdStage) {

        this.entreprise = entreprise;
        this.tuteur = tuteur;
        this.date_debut = date_debut;
        this.date_fin = date_fin;
        this.signature = signature;
        this.IdStage = IdStage;

    }

    public int getIdConvention() { return IdConvention; }
    public void setIdConvention(int IdConvention) { this.IdConvention = IdConvention; }

    public String getEntreprise() { return entreprise; }
    public void setEntreprise(String entreprise) { this.entreprise = entreprise; }

    public String getTuteur() { return tuteur; }
    public void setTuteur(String tuteur) { this.tuteur = tuteur; }

    public String getDate_debut() { return date_debut; }
    public void setDateDebut(String dateDebut) { this.date_debut = dateDebut; }

    public String getDateFin() { return date_fin; }
    public void setDateFin(String dateFin) { this.date_fin = dateFin; }

    public boolean getSignature() { return signature; }
    public void setSignature(boolean signature) { this.signature = signature; }

    public int getIdStage() { return IdStage; }
    public void setIdStage(int idStage) { this.IdStage = idStage; }
}
