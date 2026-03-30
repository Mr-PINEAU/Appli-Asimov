package com.asimov.service;

import com.asimov.api.ApiClient;
import com.asimov.model.ClasseModel;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;


public class ClasseService {

    private final ApiClient api = new ApiClient();
    private final ObjectMapper mapper = new ObjectMapper();

    public List<ClasseModel> getAll() {
        try {
            String json = api.get("/classes");
            return mapper.readValue(json, new TypeReference<List<ClasseModel>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public void ajouter(ClasseModel classe) {
        try {
            String json = mapper.writeValueAsString(classe);
            api.post("/classes", json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void modifier(ClasseModel classe) {
        try {
            String json = mapper.writeValueAsString(classe);
            api.put("/classes/" + classe.getId_classe(), json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void supprimer(int id) {
        try {
            api.delete("/classes/" + id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
