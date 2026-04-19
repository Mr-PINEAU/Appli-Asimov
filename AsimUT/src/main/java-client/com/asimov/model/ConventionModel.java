package com.asimov.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ConventionModel {

    @JsonProperty("IdConvention")
    private int IdConvention;

    // Infos entreprise
    private String entreprise;
    private String tuteur;
    private String adresse;
    private String telephone;
    private String email;

    // Dates
    @JsonProperty("date_debut")
    private String dateDebut;

    @JsonProperty("date_fin")
    private String dateFin;

    // Statut et validation
    private String statut; // "EN_ATTENTE", "VALIDEE", "REFUSEE"
    private boolean signature;

    // PDF
    @JsonProperty("fichier_pdf")
    private String fichierPdf;

    @JsonProperty("attestation_pdf")
    private String attestationPdf;

    // Clés étrangères
    @JsonProperty("id_stage")
    private int idStage;

    @JsonProperty("id_eleve")
    private int idEleve;

    @JsonProperty("id_professeur_referent")
    private int idProfesseurReferent;

    // Constructeur vide (requis par Jackson)
    public ConventionModel() {}

    // Constructeur pour la création (secrétariat)
    public ConventionModel(String entreprise, String tuteur, String adresse, String telephone, String email, String dateDebut, String dateFin, int idStage, int idEleve, int idProfesseurReferent) {

        this.entreprise = entreprise;
        this.tuteur = tuteur;
        this.adresse = adresse;
        this.telephone = telephone;
        this.email = email;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.statut = "EN_ATTENTE";
        this.signature = false;
        this.idStage = idStage;
        this.idEleve = idEleve;
        this.idProfesseurReferent = idProfesseurReferent;
    }

    // Getters & Setters
    public int getIdConvention() { return IdConvention; }
    public void setIdConvention(int idConvention) { this.IdConvention = idConvention; }

    public String getEntreprise() { return entreprise; }
    public void setEntreprise(String entreprise) { this.entreprise = entreprise; }

    public String getTuteur() { return tuteur; }
    public void setTuteur(String tuteur) { this.tuteur = tuteur; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDateDebut() { return dateDebut; }
    public void setDateDebut(String dateDebut) { this.dateDebut = dateDebut; }

    public String getDateFin() { return dateFin; }
    public void setDateFin(String dateFin) { this.dateFin = dateFin; }

    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }

    public boolean getSignature() { return signature; }
    public void setSignature(boolean signature) { this.signature = signature; }

    public String getFichierPdf() { return fichierPdf; }
    public void setFichierPdf(String fichierPdf) { this.fichierPdf = fichierPdf; }

    public String getAttestationPdf() { return attestationPdf; }
    public void setAttestationPdf(String attestationPdf) { this.attestationPdf = attestationPdf; }

    public int getIdStage() { return idStage; }
    public void setIdStage(int idStage) { this.idStage = idStage; }

    public int getIdEleve() { return idEleve; }
    public void setIdEleve(int idEleve) { this.idEleve = idEleve; }

    public int getIdProfesseurReferent() { return idProfesseurReferent; }
    public void setIdProfesseurReferent(int idProfesseurReferent) { this.idProfesseurReferent = idProfesseurReferent; }
}