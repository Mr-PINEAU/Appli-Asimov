package com.asimov.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tonprojet.api.ApiClient;
import com.tonprojet.model.Eleve;

import java.util.List;

public class EleveService {

    private final ApiClient api = new ApiClient();
    private final ObjectMapper mapper = new ObjectMapper();

    public List<Eleve> getAll() {
        try {
            String json = api.get("/eleves");
            return mapper.readValue(json, new TypeReference<List<Eleve>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public void ajouter(Eleve eleve) {
        try {
            String json = mapper.writeValueAsString(eleve);
            api.post("/eleves", json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void modifier(Eleve eleve) {
        try {
            String json = mapper.writeValueAsString(eleve);
            api.put("/eleves/" + eleve.getId(), json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void supprimer(int id) {
        try {
            api.delete("/eleves/" + id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
