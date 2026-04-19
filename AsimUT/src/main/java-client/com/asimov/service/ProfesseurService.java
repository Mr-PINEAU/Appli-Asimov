package com.asimov.service;

import com.asimov.api.ApiClient;
import com.asimov.model.ProfesseurModel;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class ProfesseurService {

    private final ApiClient api = new ApiClient();
    private final ObjectMapper mapper = new ObjectMapper();

    public List<ProfesseurModel> getAll() {
        try {
            String json = api.get("/api/professeurs");
            return mapper.readValue(json, new TypeReference<List<ProfesseurModel>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public void ajouter(ProfesseurModel professeur) {
        try {
            String json = mapper.writeValueAsString(professeur);
            api.post("/api/professeurs", json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void modifier(ProfesseurModel professeur) {
        try {
            String json = mapper.writeValueAsString(professeur);
            api.put("/api/professeurs/" + professeur.getIdProfesseur(), json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void supprimer(int id) {
        try {
            api.delete("/api/professeurs/" + id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}


