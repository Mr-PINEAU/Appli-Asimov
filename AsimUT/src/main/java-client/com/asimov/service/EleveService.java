package com.asimov.service;

import com.asimov.model.EleveModel;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.asimov.api.ApiClient;


import java.util.List;

public class EleveService {

    private final ApiClient api = new ApiClient();
    private final ObjectMapper mapper = new ObjectMapper();

    public List<EleveModel> getAll() {
        try {
            String json = api.get("/api/eleves");
            return mapper.readValue(json, new TypeReference<List<EleveModel>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public void ajouter(EleveModel eleve) {
        try {
            String json = mapper.writeValueAsString(eleve);
            api.post("/api/eleves", json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void modifier(EleveModel eleve) {
        try {
            String json = mapper.writeValueAsString(eleve);
            api.put("/api/eleves/" + eleve.getIdEleve(), json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void supprimer(int id) {
        try {
            api.delete("/api/eleves/" + id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
