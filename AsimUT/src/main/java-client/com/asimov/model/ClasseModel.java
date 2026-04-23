package com.asimov.model;



public class ClasseModel {

    private int id_classe;
    private String niveau;
    private String libelle;

    public ClasseModel (String niveau, String libelle) {

        this.niveau = niveau;
        this.libelle = libelle;

    }


    public int getId_classe() { return id_classe; }

    public String getNiveau() { return niveau; }
    public void setNiveau(String niveau) { this.niveau = niveau; }

    public String getLibelle() { return libelle; }
    public void setLibelle(String libelle) { this.libelle = libelle; }


}