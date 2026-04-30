package com.asimov.service;

import com.asimov.api.ApiClient;
import com.asimov.model.ConventionModel;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class ConventionService {

    private final ApiClient api ;
    private final ObjectMapper mapper = new ObjectMapper();

    // ← constructeur qui gère l'exception
    public ConventionService() {
        try {
            this.api = new ApiClient();
        } catch (Exception e) {
            throw new RuntimeException("Impossible d'initialiser ApiClient", e);
        }
    }

    // Récupérer toutes les conventions (proviseur, secrétariat)
    public List<ConventionModel> getAll() {
        try {
            String json = api.get("/conventions");
            return mapper.readValue(json, new TypeReference<List<ConventionModel>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    // Récupérer les conventions d'un élève
    public List<ConventionModel> getByEleve(int idEleve) {
        try {
            String json = api.get("/conventions/eleve/" + idEleve);
            return mapper.readValue(json, new TypeReference<List<ConventionModel>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    // Récupérer les conventions à valider par un professeur référent
    public List<ConventionModel> getByProfesseur(int IdProfesseur) {
        try {
            String json = api.get("/conventions/professeur/" + IdProfesseur);
            return mapper.readValue(json, new TypeReference<List<ConventionModel>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    // Ajouter (secrétariat uniquement)
    public void ajouter(ConventionModel convention) {
        try {
            String json = mapper.writeValueAsString(convention);
            api.post("/conventions", json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Modifier (secrétariat — avant validation)
    public void modifier(ConventionModel convention) {
        try {
            String json = mapper.writeValueAsString(convention);
            api.put("/conventions/" + convention.getIdConvention(), json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Valider (professeur référent uniquement)
    public void valider(int idConvention) {
        try {
            api.put("/conventions/" + idConvention + "/valider", "");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Supprimer
    public void supprimer(int id) {
        try {
            api.delete("/conventions/" + id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
